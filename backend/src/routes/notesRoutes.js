import express from "express"
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from "../controllers/notesController.js";

const router = express.Router()

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

// an endpoint is a combination of a URL + HTTP method that lets the client interact
// with a specific resource

export default router;