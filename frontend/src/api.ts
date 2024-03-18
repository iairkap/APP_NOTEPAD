import axios from "axios";

export const getNotes = async () => {
  const response = await axios.get("http://localhost:5000/api/notes");
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get("http://localhost:5000/api/categories");
  return response.data;
};

export const createNoteFromCategory = async (categoryId: number) => {
  const response = await axios.post(
    `http://localhost:5000/api/notes/fromCategory/${categoryId}`
  );
  return response.data;
};

export const deleteNote = async (noteId: number) => {
  const response = await axios.delete(
    `http://localhost:5000/api/notes/${noteId}`
  );
  return response.data;
};

export const updateNote = async (
  noteId: number,
  data: Partial<{ title: string; content: string; categories: any[] }>
) => {
  const response = await axios.put(
    `http://localhost:5000/api/notes/${noteId}`,
    data
  );
  console.log(response.data);
  return response.data;
};

export const archiveNoteInBackEnd = async (
  noteId: number,
  data: Partial<{ archive: boolean }>
) => {
  const response = await axios.patch(
    `http://localhost:5000/api/notes/archive/${noteId}`,
    data
  );
  return response.data;
};
