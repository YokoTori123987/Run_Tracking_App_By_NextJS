import { makeSchema, connectionPlugin } from "nexus";
import { join } from "path";
import * as types from "./types";
// import { PrismaClient } from '@prisma/client'
// import { nexusPrisma } from 'nexus-plugin-prisma'

export const schema = makeSchema({
  types,
  plugins: [connectionPlugin()],
  outputs: {
    typegen: join(process.cwd(), "node_modules", "@types", "nexus-typegen"),
    schema: join(process.cwd(), "graphql", "schema.graphql"),
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "graphql", "context.ts"),
  },
});
