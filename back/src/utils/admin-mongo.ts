import { DMMFClass } from 'prisma/mongoClient/runtime';
import { PrismaClient } from '../../prisma/mongoClient';

export const prismaMongo = new PrismaClient();
export const dmmf_mongo = (prismaMongo as any)._baseDmmf as DMMFClass;
