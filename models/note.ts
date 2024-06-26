import { Schema, model, models } from "mongoose";

const noteSchema = new Schema({
  title: String,
  text: String,
  urlImg: String,
  group: Number
});

const Note = models.Note || model("Note", noteSchema);

export default Note;


