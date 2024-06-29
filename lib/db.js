import { PrismaClient } from "@prisma/client";

globalThis.prisma = PrismaClient | undefined;

export const db = globalThis.prisma || new PrismaClient(); // use OR condition for preventing multiple Prisma Obj Creating

if(process.env.NODE_ENV !== "production") globalThis.prisma = db;
