import {
  enumType,
  objectType,
  stringArg,
  extendType,
  list,
  nonNull,
  booleanArg
} from "nexus";

//   import { Lap } from "./Lap";
import { Path } from "./Path";
import { Checkpoint } from "./Checkpoint";

export const PathCheckpoint = objectType({
  name: "PathCheckpoint",
  definition(t) {
    t.nonNull.string("id");
    t.boolean("isStart");
    t.boolean("isFinish");
    t.nonNull.field("path", {
      type: Path,
      resolve: (parent, _, context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id },
          })
          .path();
      },
    });
    t.nonNull.list.field("prevCheckpoint", {
      type: Checkpoint,
      resolve: (parent, _, context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id },
          })
          .prevCheckpoint();
      },
    });
    t.nonNull.list.field("checkpoint", {
      type: Checkpoint,
      resolve: (parent, _, context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id },
          })
          .checkpoint();
      },
    });
  },
});

export const PathCheckpointQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("pathCheckpoints", {
      type: "PathCheckpoint",
      resolve: async (_, args, ctx) => {
        // const [items] = await Promise.all([ctx.prisma.user.findMany()])
        // console.log(items)
        // return items
        return ctx.prisma.pathCheckpoint.findMany();
      },
    });
  },
});

export const PathCheckpointByIDQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("PathCheckpoint", {
      type: PathCheckpoint,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args, ctx) => {
        // const [items] = await Promise.all([
        //   ctx.prisma.user.findUnique({
        //     where: {
        //       id: args.id,
        //     },
        //   }),
        // ]);
        // console.log(items);
        // return items;
        return ctx.prisma.pathCheckpoint.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

export const CreatePathCheckpoint = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPathCheckpoint", {
      type: "PathCheckpoint",
      args: {
        checkpointId: stringArg(),
        prevCheckpointId: stringArg(),
        pathId: stringArg(),
        isStart: booleanArg(),
        isFinish: booleanArg(),
      },
      async resolve(_, args, ctx) {
        const newPathCheckpoint = {
          checkpointId: args.checkpointId,
          prevCheckpointId: args.prevCheckpointId,
          pathId: args.pathId,
          isStart: args.isStart,
          isFinish: args.isFinish,
        };
        return await ctx.prisma.pathCheckpoint.create({
          data: newPathCheckpoint,
        });
      },
    });
  },
});

export const UpdatePathCheckpoint = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updatePathCheckpoint", {
      type: PathCheckpoint,
      args: {
        id: stringArg(),
        checkpointId: stringArg(),
        prevCheckpointId: stringArg(),
        isStart: stringArg(),
        isFinish: stringArg(),
        pathId: stringArg(),
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.pathCheckpoint.update({
          where: {
            id: args.id,
          },
          data: {
            checkpointId: args.checkpointId,
            prevCheckpointId: args.prevCheckpointId,
            isStart: args.isStart,
            isFinish: args.isFinish,
            pathId: args.pathId,
          },
        });
      },
    });
  },
});

export const DeletePathCheckpoint = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deletePathCheckpoint", {
      type: PathCheckpoint,
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.pathCheckpoint.delete({
          where: { id: args.id },
        });
      },
    });
  },
});