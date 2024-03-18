import express from "express";
import {
  getNotes,
  addNote,
  deleteNote,
  updateNote,
  createNoteFromCategory,
  archiveNote,
} from "../services/notesService";

const router = express.Router();

router.get("/", async (req, res) => {
  const notes = await getNotes();
  res.json(notes);
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const note = await addNote(title, content);
  res.json(note);
});

router.post("/fromCategory/:categoryId", async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  const note = await createNoteFromCategory(categoryId);
  res.json(note);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await deleteNote(id);
  res.json({ success: true });
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  const note = await updateNote(id, data);
  res.json(note);
});

router.patch("/archive/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { archive } = req.body;
  const note = await archiveNote(id, { archive });
  res.json(note);
});

export default router;
