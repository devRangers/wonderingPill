import { PrismaClient } from 'prisma/postgresClient';
import { DMMFClass } from 'prisma/postgresClient/runtime';

export const prisma = new PrismaClient();
export const dmmf_postgres = (prisma as any)._baseDmmf as DMMFClass;
