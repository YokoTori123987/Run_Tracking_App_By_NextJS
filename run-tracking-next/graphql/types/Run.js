import { enumType, objectType, stringArg, extendType, nonNull } from "nexus";

import { User } from "./User";
//   import {Checkpoint} from './Checkpoint'
import { Park } from "./Park";

export const Run = objectType({
  name: "Run",
  definition(t) {
    t.nonNull.string("id");
    t.string("startTime");
    t.string("stopTime");
    t.float("distance");
    t.float("pace");
    t.field("park", {
      type: Park,
      resolve: (parent, _, context) => {
        return context.prisma.park.findFirst({
          where: { id: parent.parkId },
        });
        // .park();
      },
    });
    t.field("user", {
      type: User,
      resolve: (parent, _, context) => {
        return context.prisma.user.findFirst({
          where: { id: parent.userId },
        });
        // .user();
      },
    });
  },
});

export const RunQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("runs", {
      type: "Run",
      resolve: async (_, args, ctx) => {
        // const [items] = await Promise.all([ctx.prisma.user.findMany()])
        // console.log(items)
        // return items
        return ctx.prisma.run.findMany();
      },
    });
  },
});

export const RunByIDQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("run", {
      type: "Run",
      args: { userId: nonNull(stringArg()) },
      resolve: async (_, args, ctx) => {
        // console.log("first");
        // const [items] = await Promise.all([
        //   ctx.prisma.run.findMany({
        //     where: {
        //       userId: args.userId,
        //     },
        //   }),
        // ]);
        // console.log(items);
        // return items;
        return ctx.prisma.run.findMany({
          where: {
            userId: args.userId,
          },
        });
      },
    });
  },
});

export const CurrentRun = extendType({
  type: "Query",
  definition(t) {
    t.field("currentRun", {
      type: "Run",
      args: { userId: nonNull(stringArg()) },
      resolve: async (_, args, ctx) => {
        return ctx.prisma.run.findFirst({
          orderBy: {
            startTime: "desc",
          },
          where: {
            userId: args.userId,
          }
        })
      }
    })
  }
})

export const HistoryQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("runs", {
      type: "Run",
      resolve: async (_, args, ctx) => {
        // const [items] = await Promise.all([ctx.prisma.user.findMany()])
        // console.log(items)
        // return items
        return ctx.prisma.run.findMany({
          orderBy: {
            startTime: "desc",
          },
        });
      },
    });
  },
});