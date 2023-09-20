import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import {
  GameRecordCreateInputSchema,
  GameRecordCreateWithoutUserInputSchema,
  GameRecordWhereInputSchema,
  UserCreateInputSchema,
  UserUncheckedCreateInputSchema,
  UserUncheckedCreateWithoutGameRecordInputSchema,
  UserWhereInputSchema,
  UserWhereUniqueInputSchema,
} from "../../../../prisma/generated/zod"
import { prisma } from "@/lib/db"

const t = initTRPC.create({
  transformer: superjson,
})

export const appRouter = t.router({
  /**
   * todo: avoid redundant create user based on localstorage
   */
  createAndGetUser: t.procedure
    .input(UserUncheckedCreateInputSchema)
    .mutation(({ ctx: {}, input }) => {
      return prisma.user.create({ data: input })
    }),

  pushGameRecord: t.procedure
    .input(GameRecordCreateInputSchema)
    .mutation(({ input }) => {
      return prisma.gameRecord.create({ data: input })
    }),

  listGameRecords: t.procedure
    .input(GameRecordWhereInputSchema)
    .query(({ input }) => {
      return prisma.gameRecord.findMany({
        take: 5,
        orderBy: [{ score: "desc" }],
        include: {
          user: true,
        },
      })
    }),
})

export type AppRouter = typeof appRouter
