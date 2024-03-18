import { prisma } from "../prismaClient";

export async function getNotes() {
  return await prisma.note.findMany({
    include: {
      categories: true,
    },
  });
}

export async function deleteNote(id: number) {
  return await prisma.note.delete({
    where: {
      id: id,
    },
  });
}

export async function addNote(title: string, content: string) {
  return await prisma.note.create({
    data: {
      title: title,
      content: content,
    },
  });
}

export async function createNoteFromCategory(categoryID: number) {
  return await prisma.note.create({
    data: {
      title: "New Note",
      content: "New Note Content",
      categories: {
        connect: {
          id: categoryID,
        },
      },
    },
    include: {
      categories: true,
    },
  });
}
export async function updateNote(
  id: number,
  data: Partial<{ title: string; content: string; categories: any[] }>
) {
  const existingNote = await prisma.note.findUnique({
    where: { id },
    include: { categories: true },
  });

  if (!existingNote || !data.categories) {
    throw new Error("Note or categories not found");
  }

  const disconnectCategories = existingNote.categories.map((category) => ({
    id: category.id,
  }));
  const connectCategories = data.categories.map((category) => ({
    id: category.id,
  }));

  return await prisma.note.update({
    where: { id },
    data: {
      ...data,
      categories: {
        disconnect: disconnectCategories,
        connect: connectCategories,
      },
    },
    include: {
      categories: true, // Incluir las categorías en la respuesta
    },
  });
}

export async function archiveNote(
  id: number,
  data: Partial<{ archive: boolean }>
) {
  return await prisma.note.update({
    where: { id },
    data: {
      ...data,
    },
    include: {
      categories: true,
    },
  });
}
