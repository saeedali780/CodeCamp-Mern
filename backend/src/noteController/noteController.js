import Note from "../../models/Note.js";


export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1}); // MongoDB se saare notes fetch karo
    res.status(200).json(notes); // Response with all notes
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id); // ID ke basis par note fetch karo
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note); // Response with the found note
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res.status(500).json({ message: "Server Error" });
  } 
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Agar title ya content missing hai to error return karo
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Naya note create karo
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();

    res.status(201).json({
      message: "Note created successfully",
      note: savedNote,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    console.log("Received ID:", req.params.id); // Debugging ke liye
    console.log("Received Body:", req.body);

    // Note ko find aur update karo
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true, // Updated document return karega
        runValidators: true, // Validation apply karega
      }
    );

    // Agar note nahi mila
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const deleteNote = async (req, res) => {
  try {
    // Note ko find aur delete karo
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    // Agar note nahi mila
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
