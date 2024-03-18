import { prisma } from "../prismaClient";

export async function getCategories() {
  return await prisma.category.findMany();
}
