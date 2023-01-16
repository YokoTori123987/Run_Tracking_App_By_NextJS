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
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .park();
      },
    });
    t.list.field("user", {
      type: User,
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .user();
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
        return ctx.prisma.user.findMany();
      },
    });
  },
});
