const Note = require("../models/note");
const category = require("../models/category");

const noteController = {
  async getNotes(req, res) {
    try {
      const userId = req.auth.id;
      const noteId = req.query.id;

      //find note by id
      if (noteId) {
        const note = await Note.findOne({ userId, _id: noteId }).populate(
          "category"
        );
        if (!note) {
          return res.status(404).json({ message: "Note not found" });
        }
        console.log("user get notes", userId, noteId);
        return res.status(200).json({ message: "get note by id ", data: note });
      }
      //find all notes
      else {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const category = req.query.category;
        const categoryObj = await Category.findOne({ type: category });
        const notes = await Note.find({ userId, category: categoryObj._id })
          .skip(skip)
          .limit(limit)
          .populate("category");
        const totalNotes = await Note.countDocuments();
        const totalPages = Math.ceil(totalNotes / limit);
        console.log("user get notes", userId);
        res.status(200).json({
          message: "get all notes",
          data: notes,
          meta: { totalNotes, totalPages, currentPage: page, pageSize: limit },
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createNote(req, res) {
    try {
      const userId = req.auth.id;
      //create note
      const { title, content, category } = req.body;
      const categoryObj = await Category.findOne({ name: category });
      const note = new Note({
        userId,
        title,
        content,
        category: categoryObj._id,
      });
      await note.save();
      res
        .status(201)
        .json({ message: "Note created successfully", data: note });
      console.log("user create note", userId);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateNote(req, res) {
    try {
      const userId = req.auth.id;
      const noteId = req.params.id;
      const { title, content, category } = req.body;
      const categoryObj = await Category.findOne({ name: category });
      const updateNote = await Note.findOneAndUpdate(
        { userId, _id: noteId },
        { title, content, category: categoryObj._id },
        { new: true }
      );
      if (!updateNote) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.status(200).json({ message: "Note updated successfully" });
      console.log("user update note", userId, noteId);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteNote(req, res) {
    try {
      const userId = req.auth.id;
      const noteId = req.params.id;
      const deleteNote = await Note.findOneAndDelete({ userId, _id: noteId });
      if (!deleteNote) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.status(200).json({ message: "Note deleted successfully" });
      console.log("user delete note", userId, noteId);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = noteController;
