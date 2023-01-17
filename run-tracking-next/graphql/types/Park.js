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

export const ParkByIDQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("park", {
      type: Park,
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
        return ctx.prisma.park.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

export const CreatePark = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPark", {
      type: Park,
      args: {
        name: stringArg(),
        imageUrl: stringArg(),
        description: stringArg(),
        address: stringArg(),
        workingHours: stringArg(),
        ownerId: stringArg(),
        governorId: stringArg(),
      },
      async resolve(_, args, ctx) {
        const newPark = {
          id: args.id,
          name: args.name,
          imageUrl: args.imageUrl,
          description: args.description,
          address: args.address,
          workingHours: args.workingHours,
          ownerId: args.ownerId,
          governorId: args.governorId,
        };
        // console.log(newUser);
        return await ctx.prisma.park.create({
          data: newPark,
        });
      },
    });
  },
});

export const UpdatePark = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updatePark", {
      type: Park,
      args: {
        id: stringArg(),
        name: stringArg(),
        imageUrl: stringArg(),
        description: stringArg(),
        address: stringArg(),
        workingHours: stringArg(),
        ownerId: stringArg(),
        governorId: stringArg(),
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.park.update({
          where: {
            id: args.id,
          },
          data: {
            name: args.name,
            imageUrl: args.imageUrl,
            description: args.description,
            address: args.address,
            workingHours: args.workingHours,
            ownerId: args.ownerId,
            governorId: args.governorId,
          },
        });
      },
    });
  },
});

export const DeletePark = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deletePark", {
      type: Park,
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.park.delete({
          where: { id: args.id },
        });
      },
    });
  },
});