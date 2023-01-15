import {
  enumType,
  objectType,
  stringArg,
  extendType,
  nonNull,
} from 'nexus'
import { Lap } from './Lap'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.string('gender')
    t.string('email')
    t.string('emailuuid')
    t.field('role', {
      type: Role,
    })
    t.string('dateOfBirth')
    t.string('firstName')
    t.string('imageUrl')
    t.string('lastName')
    t.string('currentCheckpoint')
    t.int('bib')
    t.string('phoneNumber')
    t.string('phoneNumberuuid')
    // t.list.field('run', {
    //   type: 'Run',
    //   resolve: (parent, _, context) => {
    //     return context.prisma.user
    //       .findUnique({
    //         where: { id: parent.id },
    //       })
    //       .run()
    //   },
    // })
    // t.list.field('log', {
    //   type: 'Log',
    //   resolve: (parent, _, context) => {
    //     return context.prisma.user
    //       .findUnique({
    //         where: { id: parent.id },
    //       })
    //       .log()
    //   },
    // })
    t.list.field('Lap', {
      type: Lap,
      async resolve(parent, _, context) {
        return await context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .Lap()
      },
    })
    // t.list.field('ownedParks', {
    //   type: 'OwnedParks',
    //   resolve: (parent, _, context) => {
    //     return context.prisma.user
    //       .findUnique({
    //         where: { id: parent.id },
    //       })
    //       .ownedParks()
    //   },
    // })
    // t.list.field('governedParks', {
    //   type: 'GovernedParks',
    //   resolve: (parent, _, context) => {
    //     return context.prisma.user
    //       .findUnique({
    //         where: { id: parent.id },
    //       })
    //       .governedParks()
    //   },
    // })
  },
})

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN', 'SCANNER', 'OWNED', 'GOVERNED'],
})

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve: async (_, args, ctx) => {
        // const [items] = await Promise.all([ctx.prisma.user.findMany()])
        // console.log(items)
        // return items
        return ctx.prisma.user.findMany()
      },
    })
  },
})

// export const Useru

// export const createUser = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.field('createUser', {
//       type: User,
//       args: {
//         gender: stringArg(),
//         email: stringArg(),
//         emailuuid: stringArg(),
//         dateOfBirth: stringArg(),
//         firstName: stringArg(),
//         lastName: stringArg(),
//         imageUrl: stringArg(),
//         phoneNumber: stringArg(),
//         phoneNumberuuid: stringArg(),
//       },
//       async resolve(_, args, ctx) {
//         const newUser = {
//           gender: args.gender,
//           email: args.email,
//           emailuuid: args.emailuuid,
//           dateOfBirth: args.dateOfBirth,
//           firstName: args.firstName,
//           lastName: args.lastName,
//           imageUrl: args.imageUrl,
//           phoneNumber: args.phoneNumber,
//           phoneNumberuuid: args.phoneNumberuuid
//         }
//         console.log(newUser)
//         return await ctx.prisma.user.create({
//           data: newUser,
//         })
//       },
//     })
//   },
// })
