import express from "express";
import cors from "cors";
import { prisma } from "../prismaClient";
import notesRouter from "../routes/notesRoutes";
import categorieRouter from "../routes/categoriesRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/notes", notesRouter);
app.use("/api/categories", categorieRouter);

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
