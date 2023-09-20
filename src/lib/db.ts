import { PrismaClient } from "@prisma/client"

function getExtendedClient() {
  const c = new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? [
            // 'query',
            "warn",
            "error",
          ]
        : ["error"],
  })

  globalForDB.prisma = c

  return c
}

export type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>

const globalForDB = globalThis as unknown as {
  prisma?: ExtendedPrismaClient
}
export const prisma = globalForDB.prisma ?? getExtendedClient()

if (process.env.NODE_ENV !== "production") {
  globalForDB.prisma = prisma
}
