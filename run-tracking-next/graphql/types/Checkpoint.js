import {
    enumType,
    objectType,
    stringArg,
    extendType,
    nonNull,
  } from 'nexus'

  import {Log} from './Log'
  import {PathCheckpoint, PrevPathCheckpoint} from './PathCheckpoint'
  import {Park} from './Park'
  
  export const Checkpoint = objectType({
    name: 'Checkpoint',
    definition(t) {
      t.nonNull.string('id')
      t.string('name')
      t.float('longitude')
      t.float('latitude')
      t.field('park', {
        type: Park,
        resolve: (parent, _, context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id },
            })
            .park()
        },
      })
      t.list.field('Log', {
        type: Log,
        resolve: (parent, _, context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id },
            })
            .Log()
        },
      })
      t.list.field('PathCheckpoint', {
        type: PathCheckpoint,
        resolve: (parent, _, context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id },
            })
            .PathCheckpoint()
        },
      })
      t.list.field('PrevPathCheckpoint', {
        type: PrevPathCheckpoint,
        resolve: (parent, _, context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id },
            })
            .PrevPathCheckpoint()
        },
      })
    },
})