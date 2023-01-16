import { enumType, objectType, stringArg, extendType, nonNull } from "nexus";

import { User } from "./User";
import { Path } from "./Path";

export const Lap = objectType({
  name: "Lap",
  definition(t) {
    t.nonNull.string("id");
    t.string("startTime");
    t.string("stopTime");
    t.nonNull.field("user", {
      type: User,
      async resolve(parent, _, context) {
        return await context.prisma.post
          .findUnique({
            where: { id: parent.id },
          })
          .user();
      },
    });
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
  },
});

export const LapQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("laps", {
      type: "Lap",
      resolve: async (_, args, ctx) => {
        // const [items] = await Promise.all([ctx.prisma.user.findMany()])
        // console.log(items)
        // return items
        return ctx.prisma.user.findMany();
      },
    });
  },
});
