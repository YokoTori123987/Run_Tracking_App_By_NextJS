import {
  floatArg,
  objectType,
  stringArg,
  extendType,
  intArg,
  arg,
  nonNull,
} from "nexus";

import { Log } from "./Log";
import { PathCheckpoint } from "./PathCheckpoint";
import { Park } from "./Park";
import { prisma } from "@prisma/client";
import dayjs from "dayjs";
// import { resolve } from "styled-jsx/css";
// import { resolve } from "styled-jsx/css";

export const Checkpoint = objectType({
  name: "Checkpoint",
  definition(t) {
    t.nonNull.string("id");
    t.string("name");
    t.float("longitude");
    t.float("latitude");
    t.field("park", {
      type: Park,
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .park();
      },
    });
    t.list.field("Log", {
      type: Log,
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .Log();
      },
    });
    t.list.field("PathCheckpoint", {
      type: PathCheckpoint,
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .PathCheckpoint();
      },
    });
    t.list.field("PrevPathCheckpoint", {
      type: PathCheckpoint,
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .PrevPathCheckpoint();
      },
    });
  },
});

export const CheckpointQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("checkpoints", {
      type: Checkpoint,
      resolve: async (_, args, ctx) => {
        // const [items] = await Promise.all([ctx.prisma.user.findMany()])
        // console.log(items)
        // return items
        return ctx.prisma.checkpoint.findMany();
      },
    });
  },
});

export const CreateCheckpoint = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createCheckpoint", {
      type: Checkpoint,
      args: {
        name: stringArg(),
        longitude: floatArg(),
        latitude: floatArg(),
        parkId: stringArg(),
      },
      async resolve(_, args, ctx) {
        const newCheckpoint = {
          name: args.name,
          longitude: args.longitude,
          latitude: args.latitude,
          parkId: args.parkId,
        };
        console.log(newCheckpoint);
        return await ctx.prisma.checkpoint.create({
          data: newCheckpoint,
        });
      },
    });
  },
});

export const UpdateCheckpoint = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateCheckpoint", {
      type: Checkpoint,
      args: {
        id: stringArg(),
        name: stringArg(),
        longitude: floatArg(),
        latitude: floatArg(),
        parkId: stringArg(),
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.checkpoint.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name,
            longitude: args.longitude,
            latitude: args.latitude,
            parkId: args.parkId,
          },
        });
      },
    });
  },
});

export const DeleteCheckpoint = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteCheckpoint", {
      type: Checkpoint,
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.checkpoint.delete({
          where: { id: args.id },
        });
      },
    });
  },
});

export const checkRunningPath = extendType({
  type: "Mutation",
  definition(t) {
    t.field("checkRuning", {
      type: Checkpoint,
      args: {
        checkpointId: nonNull(stringArg()),
        userId: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        console.log(args.checkpointId + " / " + args.userId);
        // console.log(new Date());
        const user = await ctx.prisma.user.findUnique({
          where: { id: args.userId },
        });
        const checkpointNull = await ctx.prisma.pathCheckpoint.findFirst({
          where: {
            checkpointId: args.checkpointId,
            AND: { prevCheckpointId: null },
          },
        });
        const checkpoint = await ctx.prisma.pathCheckpoint.findFirst({
          where: {
            checkpointId: args.checkpointId,
            NOT: { prevCheckpointId: null },
          },
        });
        // console.log(checkpointNull);
        // console.log(checkpointNull.pathId);
        // console.log(checkpoint.id + " / " + "on");
        if (checkpoint) {
          if (user.currentCheckpoint == checkpoint.prevCheckpointId) {
            if (checkpoint.isFinish === true) {
              // stopRuning(args.userId, args.checkpointId, args.checkpointNull);
              console.log("stop");
              const test = await ctx.prisma.log.create({
                data: {
                  userId: args.userId,
                  timeStamp: new Date(),
                  checkpointId: args.checkpointId,
                },
              });
              console.log(test);
              const poplap = await ctx.prisma.lap.findMany({
                orderBy: {
                  stopTime: "desc",
                },
                where: {
                  userId: args.userId,
                  AND: {
                    pathId: checkpoint.pathId,
                  },
                },
                include: {
                  path: true,
                },
              });
              console.log(poplap);
              const createrun = await ctx.prisma.lap.update({
                where: {
                  id: poplap[0].id,
                },
                data: { stopTime: new Date() },
              });
              console.log(createrun);
              const lopiuo = dayjs(createrun.stopTime).diff(
                createrun.startTime,
                "minute",
                true
              );
              console.log(lopiuo.toFixed(2));

              await ctx.prisma.run.create({
                data: {
                  startTime: createrun.startTime,
                  stopTime: createrun.stopTime,
                  distance: poplap[0].path.distance,
                  pace: lopiuo.toFixed(2) / poplap[0].path.distance,
                  userId: createrun.userId,
                  parkId: poplap[0].path.parkId,
                },
              });
              await ctx.prisma.user.update({
                data: { currentCheckpoint: null },
                where: {
                  id: args.userId,
                },
              });
              if (checkpointNull) {
                // startRuning({ userId, checkpointNull, checkpointId });
                const user = await ctx.prisma.user.findUnique({
                  where: { id: args.userId },
                });
                if (
                  user.currentCheckpoint === checkpointNull.prevCheckpointId
                ) {
                  if (checkpointNull.isStart === true) {
                    await ctx.prisma.user.update({
                      data: { currentCheckpoint: args.checkpointId },
                      where: {
                        id: args.userId,
                      },
                    });
                    await ctx.prisma.log.create({
                      data: {
                        userId: args.userId,
                        timeStamp: new Date(),
                        checkpointId: args.checkpointId,
                      },
                    });
                    await ctx.prisma.lap.create({
                      data: {
                        userId: userId,
                        pathId: checkpointNull.pathId,
                        startTime: new Date(),
                        stopTime: null,
                      },
                    });
                  }
                }
              }
            } else {
              await ctx.prisma.user.update({
                data: { currentCheckpoint: args.checkpointId },
                where: {
                  id: args.userId,
                },
              });
              await ctx.prisma.log.create({
                data: {
                  userId: args.userId,
                  timeStamp: new Date(),
                  checkpointId: args.checkpointId,
                },
              });
            }
          }
        }
        if (checkpointNull) {
          // startRuning(args.userId, args.checkpointNull, args.checkpointId);
          const user = await ctx.prisma.user.findUnique({
            where: { id: args.userId },
          });
          if (user.currentCheckpoint === checkpointNull.prevCheckpointId) {
            if (checkpointNull.isStart === true) {
              await ctx.prisma.user.update({
                data: { currentCheckpoint: args.checkpointId },
                where: {
                  id: args.userId,
                },
              });
              await ctx.prisma.log.create({
                data: {
                  userId: args.userId,
                  timeStamp: new Date(),
                  checkpointId: args.checkpointId,
                },
              });
              const pop = await ctx.prisma.lap.create({
                data: {
                  userId: args.userId,
                  pathId: checkpointNull.pathId,
                  startTime: new Date(),
                  stopTime: null,
                },
              });
              console.log(pop);
            }
          }
        }
        // return true;

        return checkpoint;
      },
    });
  },
});

const stopRuning = async (userId, checkpointId, checkpointNull) => {
  // const dayjs = require("dayjs");
  await prisma.log.create({
    data: {
      userId: userId,
      timeStamp: new Date(),
      checkpointId: checkpointId,
    },
  });

  const poplap = await prisma.lap.findMany({
    orderBy: {
      stopTime: "desc",
    },
    where: {
      userId: userId,
      AND: {
        pathId: checkpoint.pathId,
      },
    },
    include: {
      path: true,
    },
  });

  const createrun = await prisma.lap.update({
    where: {
      id: poplap[0].id,
    },
    data: { stopTime: new Date() },
  });

  const lopiuo = dayjs(createrun.stopTime).diff(
    createrun.startTime,
    "minute",
    true
  );

  console.log(lopiuo.toFixed(2));

  await prisma.run.create({
    data: {
      startTime: createrun.startTime,
      stopTime: createrun.stopTime,
      distance: poplap[0].path.distance,
      pace: lopiuo.toFixed(2) / poplap[0].path.distance,
      userId: createrun.userId,
      parkId: poplap[0].path.parkId,
    },
  });
  await prisma.user.update({
    data: { currentCheckpoint: null },
    where: {
      id: userId,
    },
  });
  if (checkpointNull) {
    startRuning({ userId, checkpointNull, checkpointId });
  }
};

// const startRuning = async (userId, checkpointNull, checkpointId) => {
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   });
//   if (user.currentCheckpoint === checkpointNull.prevCheckpointId) {
//     if (checkpointNull.isStart === true) {
//       await prisma.user.update({
//         data: { currentCheckpoint: checkpointId },
//         where: {
//           id: userId,
//         },
//       });
//       await prisma.log.create({
//         data: {
//           userId: userId,
//           timeStamp: new Date(),
//           checkpointId: checkpointId,
//         },
//       });
//       await prisma.lap.create({
//         data: {
//           userId: userId,
//           pathId: checkpointNull.pathId,
//           startTime: new Date(),
//           stopTime: null,
//         },
//       });
//     }
//   }
// };
