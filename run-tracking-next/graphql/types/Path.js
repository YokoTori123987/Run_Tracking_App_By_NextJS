import {
  enumType,
  objectType,
  stringArg,
  extendType,
  list,
  nonNull,
} from 'nexus'

import {Lap} from './Lap'

export const Path = objectType({
  name: 'Path',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.float('distance')
    // t.nonNull.field('park', {
    //   type: 'Park',
    //   resolve: (parent, _, context) => {
    //     return context.prisma.post
    //       .findUnique({
    //         where: { id: parent.id },
    //       })
    //       .park()
    //   },
    // })
    t.nonNull.list.field('Lap', {
      type: Lap,
      resolve: (parent, _, context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent.id },
          })
          .Lap()
      },
    })
//     t.nonNull.list.field('PathCheckpoint', {
//       type: 'PathCheckpoint',
//       resolve: (parent, _, context) => {
//         return context.prisma.post
//           .findUnique({
//             where: { id: parent.id },
//           })
//           .PathCheckpoint()
//       },
//     })
  },
})
