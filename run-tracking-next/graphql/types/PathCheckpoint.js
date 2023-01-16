import {
  enumType,
  objectType,
  stringArg,
  extendType,
  list,
  nonNull,
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
        return ctx.prisma.user.findMany();
      },
    });
  },
});
