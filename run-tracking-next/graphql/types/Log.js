import { enumType, objectType, stringArg, extendType, nonNull } from "nexus";

import { User } from "./User";
import { Checkpoint } from "./Checkpoint";
// import { Log } from "./Log";
// import { OwnedParks, GovernedParks } from "./Park";

export const Log = objectType({
  name: "Log",
  definition(t) {
    t.nonNull.string("id");
    t.string("timeStamp");
    t.field("user", {
      type: User,
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .user();
      },
    });
    t.field("Checkpoint", {
      type: Checkpoint,
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .Checkpoint();
      },
    });
  },
});

export const LogQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("logs", {
      type: "Log",
      resolve: async (_, args, ctx) => {
        // const [items] = await Promise.all([ctx.prisma.user.findMany()])
        // console.log(items)
        // return items
        return ctx.prisma.log.findMany();
      },
    });
  },
});
