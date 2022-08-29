import { PrismaClient } from 'prisma/postgresClient';
import { DMMFClass } from 'prisma/postgresClient/runtime';

export const prisma = new PrismaClient();
export const dmmf_postgres = (prisma as any)._baseDmmf as DMMFClass;

export const postgresResourceArr = [
  {
    resource: {
      model: dmmf_postgres.modelMap.User,
      client: prisma,
    },
    options: {},
  },
  {
    resource: {
      model: dmmf_postgres.modelMap.Pill,
      client: prisma,
    },
    options: {},
  },
  {
    resource: {
      model: dmmf_postgres.modelMap.Inquiry,
      client: prisma,
    },
    options: {},
  },
];
