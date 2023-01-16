import { enumType, objectType, stringArg, extendType, nonNull } from "nexus";

import { Log } from "./Log";
import { PathCheckpoint } from "./PathCheckpoint";
import { Park } from "./Park";

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
        longitude: stringArg(),
        latitude: stringArg(),
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
