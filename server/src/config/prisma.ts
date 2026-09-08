// Config file to ensure only ONE prisma instance across the project for data querying and db updating

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;