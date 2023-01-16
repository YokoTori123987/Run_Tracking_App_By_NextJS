import { enumType, objectType, stringArg, extendType, nonNull } from "nexus";

import { Run } from "./Run";
import { Checkpoint } from "./Checkpoint";
import { Path } from "./Path";
import { User } from "./User";

export const Park = objectType({
  name: "Park",
  definition(t) {
    t.nonNull.string("id");
    t.string("name");
    t.string("imageUrl");
    t.string("description");
    t.string("address");
    t.string("workingHours");
    t.field("owner", {
      type: User,
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .owner();
      },
    });
    t.field("governor", {
      type: User,
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .governor();
      },
    });
    t.list.field("Run", {
      type: Run,
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .Run();
      },
    });
    t.list.field("Checkpoint", {
      type: Checkpoint,
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .Checkpoint();
      },
    });
    t.list.field("Path", {
      type: Path,
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .Path();
      },
    });
  },
});

export const ParkQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("parks", {
      type: "Park",
      resolve: async (_, args, ctx) => {
        // const [items] = await Promise.all([ctx.prisma.user.findMany()])
        // console.log(items)
        // return items
        return ctx.prisma.user.findMany();
      },
    });
  },
});
