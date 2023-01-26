import {
  enumType,
  objectType,
  stringArg,
  extendType,
  nonNull,
  arg,
} from "nexus";

import { Run } from "./Run";

export const AdminDetails = extendType({
  type: "Query",
  definition(t) {
    t.field("AdminDetails", {
      type: Run,
      resolve: async (_, args, ctx) => {
        const opo = await ctx.prisma.run.findMany({
          include: {
            //   by: ["name"],
            park: true,
            // park: true,
            // groupby: { park: { name: "A" } },
            user: true,
            // include: {
            //   Run: true,
          },
          //   },
        });
        console.log(opo);
        return opo;
      },
    });
  },
});
