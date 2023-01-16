import {
  enumType,
  objectType,
  stringArg,
  extendType,
  list,
  nonNull,
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
