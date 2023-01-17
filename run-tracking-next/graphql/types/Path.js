import {
  enumType,
  objectType,
  stringArg,
  extendType,
  list,
  nonNull,
  floatArg,
} from "nexus";

import { Lap } from "./Lap";
import { Park } from "./Park";
import { PathCheckpoint } from "./PathCheckpoint";

export const Path = objectType({
  name: "Path",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nonNull.float("distance");
    t.nonNull.field("park", {
      type: Park,
      resolve: (parent, _, context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id },
          })
          .park();
      },
    });
    t.nonNull.list.field("Lap", {
      type: Lap,
      resolve: (parent, _, context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id },
          })
          .Lap();
      },
    });
    t.nonNull.list.field("PathCheckpoint", {
      type: PathCheckpoint,
      resolve: (parent, _, context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id },
          })
          .PathCheckpoint();
      },
    });
  },
});

export const PathQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("paths", {
      type: "Path",
      resolve: async (_, args, ctx) => {
        // const [items] = await Promise.all([ctx.prisma.user.findMany()])
        // console.log(items)
        // return items
        return ctx.prisma.user.findMany();
      },
    });
  },
});

export const PathByIDQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("path", {
      type: Path,
      args: { id: nonNull(stringArg()) },
      resolve: async (_, args, ctx) => {
        // const [items] = await Promise.all([ctx.prisma.user.findMany()])
        // console.log(items)
        // return items
        return ctx.prisma.path.findMany({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

export const CreatePath = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPath", {
      type: Path,
      args: {
        name: stringArg(),
        parkId: stringArg(),
        distance: floatArg(),
      },
      async resolve(_, args, ctx) {
        const newPath = {
          id: args.id,
          name: args.name,
          parkId: args.parkId,
          distance: args.distance,

        };
        // console.log(newUser);
        return await ctx.prisma.path.create({
          data: newPath,
        });
      },
    });
  },
});

export const UpdatePath = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updatePath", {
      type: Path,
      args: {
        id: stringArg(),
        name: stringArg(),
        parkId: stringArg(),
        distance: floatArg(),
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.path.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name,
            parkId: args.parkId,
            distance: args.distance,
          },
        });
      },
    });
  },
});

export const DeletePath = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deletePath", {
      type: Path,
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.path.delete({
          where: { id: args.id },
        });
      },
    });
  },
});