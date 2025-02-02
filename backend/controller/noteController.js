const Note = require("../models/note");
const Category = require("../models/category");

const noteController = {
  async getNotes(req, res) {
    const userId = req.auth.id;
    const noteId = req.query.id || null;
    const category = req.query.category || null;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    // console.log("user get notes", {
    //   userId,
    //   noteId,
    //   category,
    //   page,
    //   limit,
    //   skip,
    // });
    try {
      //find note by id
      if (noteId) {
        const note = await Note.findOne({ userId, _id: noteId })
          .populate("category", "type ")
          .populate("userId", "firstName lastName email image");
        if (!note) {
          return res.status(404).json({ message: "Note not found" });
        }
        console.log("user get notes by note id", userId, noteId);
        return res.status(200).json({ message: "get note by id ", data: note });
      }
      //find all notes
      else {
        const query = {
          userId,
          category: category ? category : { $ne: null },
        };
        const notes = await Note.find(query)
          .skip(skip)
          .limit(limit)
          .populate("category", "type ")
          .populate("userId", "firstName lastName email image");
        const totalNotes = await Note.countDocuments(query);
        const totalPages = Math.ceil(totalNotes / limit);
        console.log("user get all  notes", userId, totalNotes, totalPages);
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
      console.log("user create note", userId, title, content, category);
      const note = new Note({
        userId,
        title,
        content,
        category,
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
    // console.log("update note", req.body, req.params);
    try {
      const userId = req.auth.id;
      const noteId = req.params.id;
      // console.log("user update note", userId, noteId);
      const { title, content, category } = req.body;
      console.log("user update note", userId, noteId, title, content, category);
      const categoryObj = await Category.findOne({ _id: category });
      if (!categoryObj) {
        return res.status(404).json({ message: "Category not found" });
      }
      const updateNote = await Note.findOneAndUpdate(
        { userId, _id: noteId },
        { title, content, category: categoryObj._id },
        { new: true }
      );
      if (!updateNote) {
        console.log("can not find the  note", userId, noteId);
        return res.status(404).json({ message: "Note not found" });
      }
      res.status(200).json({ message: "Note updated successfully" });
      console.log("user update note", userId, noteId);
    } catch (error) {
      console.log("error update note", error);
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

  async updateNoteState(req, res) {
    try {
      const userId = req.auth.id;
      const noteId = req.params.id;
      const note = await Note.findOne({ userId, _id: noteId });
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      note.state = !note.state;
      await note.save();
      res.status(200).json({ message: "Note state updated successfully" });
      console.log("user update note state", userId, noteId);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = noteController;
