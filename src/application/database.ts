import {PrismaClient} from "@prisma/client";
import {logger} from "./logging";

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query"
        },
        {
            emit: "event",
            level: "error"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "warn"
        }
    ]
});

// prismaClient.$on("error", (e) => {
//     logger.error("database", e);
// })

// prismaClient.$on("warn", (e) => {
//     logger.warn("database", e);
// })

// prismaClient.$on("info", (e) => {
//     logger.info("database", e);
// })

// prismaClient.$on("query", (e) => {
//     logger.info("database", e);
// })
