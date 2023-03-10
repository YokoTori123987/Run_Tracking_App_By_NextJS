import {
  enumType,
  objectType,
  stringArg,
  extendType,
  nonNull,
  arg,
} from "nexus";

import { Run } from "./Run";
import { Lap } from "./Lap";
import { Log } from "./Log";
import { Park } from "./Park";
// import { resolve } from "styled-jsx/macro";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.string("id");
    t.string("gender");
    t.string("email");
    t.string("emailuuid");
    t.field("role", {
      type: Role,
    });
    t.string("dateOfBirth");
    t.string("firstName");
    t.string("imageUrl");
    t.string("lastName");
    t.string("currentCheckpoint");
    t.int("bib");
    t.string("phoneNumber");
    t.string("phoneNumberuuid");
    t.list.field("Run", {
      type: Run,
      async resolve(parent, _, context) {
        return await context.prisma.run.findMany({
          where: { userId: parent.id },
        });
        // .Run();
      },
    });
    t.list.field("Log", {
      type: Log,
      async resolve(parent, _, context) {
        return await context.prisma.log.findMany({
          where: { id: parent.id },
        });
        // .Log();
      },
    });
    t.list.field("Lap", {
      type: Lap,
      async resolve(parent, _, context) {
        return await context.prisma.lap.findMany({
          where: { id: parent.id },
        });
        // .Lap();
      },
    });
    t.list.field("OwnedParks", {
      type: Park,
      async resolve(parent, _, context) {
        return await context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .OwnedParks();
      },
    });
    t.list.field("GovernedParks", {
      type: Park,
      async resolve(parent, _, context) {
        return await context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .GovernedParks();
      },
    });
    t.list.field("runsHistory", {
      type: Run,
      async resolve(parent, _, context) {
        return await context.prisma.run.findMany({
          where: { userId: parent.id },
          orderBy: {
            startTime: "desc",
          },
        });
        // .Run();
      },
    });
  },
});

const Role = enumType({
  name: "Role",
  members: ["USER", "ADMIN", "SCANNER", "OWNED", "GOVERNED"],
});

export const UserAuthQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("authUser", {
      type: User,
      args: { phoneNumberuuid: nonNull(stringArg()) },
      resolve: async (_, args, ctx) => {
        const test = await ctx.prisma.user.findFirst({
          where: {
            phoneNumberuuid: args.phoneNumberuuid,
          },
        });
        console.log(test);
        return test;
        // return ctx.prisma.user.findUnique({
        //   where: {
        //     phoneNumberuuid: args.phoneNumberuuid,
        //   },
        // });
      },
    });
  },
});

export const UsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("users", {
      type: "User",
      resolve: async (_, args, ctx) => {
        // const [items] = await Promise.all([ctx.prisma.user.findMany()])
        // console.log(items)
        // return items
        return ctx.prisma.user.findMany();
      },
    });
  },
});

export const UserByIDQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("user", {
      type: "User",
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
        return ctx.prisma.user.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

export const CreateUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: User,
      args: {
        gender: stringArg(),
        email: stringArg(),
        emailuuid: stringArg(),
        dateOfBirth: stringArg(),
        firstName: stringArg(),
        lastName: stringArg(),
        imageUrl: stringArg(),
        phoneNumber: stringArg(),
        phoneNumberuuid: stringArg(),
      },
      async resolve(_, args, ctx) {
        const newUser = {
          gender: args.gender,
          email: args.email,
          emailuuid: args.emailuuid,
          dateOfBirth: args.dateOfBirth,
          firstName: args.firstName,
          lastName: args.lastName,
          imageUrl: args.imageUrl,
          phoneNumber: args.phoneNumber,
          phoneNumberuuid: args.phoneNumberuuid,
        };
        // console.log(newUser);
        return await ctx.prisma.user.create({
          data: newUser,
        });
      },
    });
  },
});

export const UpdateUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateUser", {
      type: User,
      args: {
        id: stringArg(),
        gender: stringArg(),
        dateOfBirth: stringArg(),
        firstName: stringArg(),
        lastName: stringArg(),
        imageUrl: stringArg(),
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.user.update({
          where: {
            id: args.id,
          },
          data: {
            gender: args.gender,
            dateOfBirth: args.dateOfBirth,
            firstName: args.firstName,
            lastName: args.lastName,
            imageUrl: args.imageUrl,
          },
        });
      },
    });
  },
});

export const DeleteUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteUser", {
      type: User,
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.user.delete({
          where: { id: args.id },
        });
      },
    });
  },
});

export const UpdateRoleUser = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateRole", {
      type: User,
      args: {
        id: nonNull(stringArg()),
        role: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.user.update({
          where: {
            id: args.id,
          },
          data: {
            role: args.role,
          },
        });
      },
    });
  },
});

export const UpdateUserQR = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateUserQR", {
      type: User,
      args: {
        id: stringArg(),
        gender: stringArg(),
        dateOfBirth: stringArg(),
        firstName: stringArg(),
        lastName: stringArg(),
        imageUrl: stringArg(),
        email: stringArg(),
        phoneNumber: stringArg(),
        phoneNumberuuid: stringArg(),
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.user.update({
          where: {
            id: args.id,
          },
          data: {
            gender: args.gender,
            dateOfBirth: args.dateOfBirth,
            firstName: args.firstName,
            lastName: args.lastName,
            imageUrl: args.imageUrl,
            email: args.email,
            phoneNumber: args.phoneNumber,
            phoneNumberuuid: args.phoneNumberuuid,
          },
        });
      },
    });
  },
});
