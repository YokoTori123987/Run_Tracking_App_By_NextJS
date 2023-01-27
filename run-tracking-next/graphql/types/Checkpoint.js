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
import { send } from "micro";

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
        return context.prisma.checkpoint.findFirst({
          where: { id: parent.id },
        });
      },
    });
    t.list.field("Log", {
      type: Log,
      resolve: (parent, _, context) => {
        return context.prisma.checkpoint.findMany({
          where: { id: parent.id },
        });
        // .Log();
      },
    });
    t.list.field("PathCheckpoint", {
      type: PathCheckpoint,
      resolve: (parent, _, context) => {
        return context.prisma.checkpoint.findMany({
          where: { id: parent.id },
        });
        // .PathCheckpoint();
      },
    });
    t.list.field("PrevPathCheckpoint", {
      type: PathCheckpoint,
      resolve: (parent, _, context) => {
        return context.prisma.checkpoint.findMany({
          where: { id: parent.id },
        });
        // .PrevPathCheckpoint();
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
        // return items
        return ctx.prisma.checkpoint.findMany();
      },
    });
  },
});

export const CheckpointByIDQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("checkpoint", {
      type: Checkpoint,
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        // const [items] = await Promise.all([ctx.prisma.user.findMany()])
        // return items
        return ctx.prisma.checkpoint.findUnique({
          where: {
            id: args.id,
          },
        });
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
    t.field("checkRunning", {
      type: "String",
      args: {
        checkpointId: nonNull(stringArg()),
        userId: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: { id: args.userId },
        });
        const checkpointNull = await ctx.prisma.pathCheckpoint.findFirst({
          where: {
            checkpointId: args.checkpointId,
            AND: { prevCheckpointId: null },
          },
          include: {
            prevCheckpoint: true,
          },
        });
        const checkpoint = await ctx.prisma.pathCheckpoint.findFirst({
          where: {
            checkpointId: args.checkpointId,
            NOT: { prevCheckpointId: null },
          },
          include: {
            prevCheckpoint: true,
            checkpoint: true,
          },
        });

        // if (user) {
        if (checkpoint) {
          // เช็คว่า จุดเช็คพ้อยของ user ตรงกับ เช็คพ้อยก่อนหน้าไหม
          if (user.currentCheckpoint == checkpoint.prevCheckpointId) {
            if (checkpoint.isFinish === true) {
              // ทำฟังก์ชั่น หยุดรอบการวิ่ง
              // stopRuning(args.userId, args.checkpointId, args.checkpointNull);
              // ทำการสร้างข้อมูลลง log
              await ctx.prisma.log.create({
                data: {
                  userId: args.userId,
                  timeStamp: new Date(),
                  checkpointId: args.checkpointId,
                },
              });
              // ทำการสร้างข้อมูลลง lap
              const poplap = await ctx.prisma.lap.findFirst({
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
              // ทำการอัพเดทข้อมูลของ lap ก่อนหน้าที่สร้างไปแล้ว
              const createrun = await ctx.prisma.lap.update({
                where: {
                  id: poplap.id,
                },
                data: { stopTime: new Date() },
              });
              // ทำการบวกลบเวลา ให้ได้เวลาวิ่งจริง
              const lopiuo = dayjs(createrun.stopTime).diff(
                createrun.startTime,
                "minute",
                true
              );
              // สร้าง run
              const test = await ctx.prisma.run.create({
                data: {
                  startTime: createrun.startTime,
                  stopTime: createrun.stopTime,
                  distance: poplap.path.distance,
                  pace: lopiuo.toFixed(2) / poplap.path.distance,
                  userId: createrun.userId,
                  parkId: poplap.path.parkId,
                },
              });
              await ctx.prisma.user.update({
                data: { currentCheckpoint: null },
                where: {
                  id: args.userId,
                },
              });

              if (checkpointNull) {
                // เริ่มการวิ่ง
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
                  return (
                    "นาย : " + user.firstName + " เริ่มวิ่ง BIB : " + user.bib
                  );
                }
              }
              return "นาย : " + user.firstName + " จบการวิ่ง BIB : " + user.bib;
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
              return (
                "นาย : " +
                user.firstName +
                " BIB : " +
                user.bib +
                " จุดปัจจุบัน : " +
                checkpoint.checkpoint.name
              );
            }
          }
          if (user.currentCheckpoint != checkpoint.prevCheckpointId) {
            return "ผิดทาง ทางที่ถูกคือ : " + checkpoint.prevCheckpoint.name;
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
              return "นาย : " + user.firstName + " เริ่มวิ่ง BIB : " + user.bib;
            }
          }
        } else {
          return "ผิดทาง ทางที่ถูกคือ" + checkpointNull.prevCheckpoint.name;
        }
      },
      // return "ไม่มีผู้ใช้อยู่ในระบบ";
      // },
    });
  },
});

// const stopRuning = async (userId, checkpointId, checkpointNull) => {
//   // const dayjs = require("dayjs");
//   await prisma.log.create({
//     data: {
//       userId: userId,
//       timeStamp: new Date(),
//       checkpointId: checkpointId,
//     },
//   });

//   const poplap = await prisma.lap.findMany({
//     orderBy: {
//       stopTime: "desc",
//     },
//     where: {
//       userId: userId,
//       AND: {
//         pathId: checkpoint.pathId,
//       },
//     },
//     include: {
//       path: true,
//     },
//   });

//   const createrun = await prisma.lap.update({
//     where: {
//       id: poplap[0].id,
//     },
//     data: { stopTime: new Date() },
//   });

//   const lopiuo = dayjs(createrun.stopTime).diff(
//     createrun.startTime,
//     "minute",
//     true
//   );

//   await prisma.run.create({
//     data: {
//       startTime: createrun.startTime,
//       stopTime: createrun.stopTime,
//       distance: poplap[0].path.distance,
//       pace: lopiuo.toFixed(2) / poplap[0].path.distance,
//       userId: createrun.userId,
//       parkId: poplap[0].path.parkId,
//     },
//   });
//   await prisma.user.update({
//     data: { currentCheckpoint: null },
//     where: {
//       id: userId,
//     },
//   });
//   if (checkpointNull) {
//     startRuning({ userId, checkpointNull, checkpointId });
//   }
// };

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
