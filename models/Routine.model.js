const { Schema, model } = require("mongoose");

const routineSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nombre de la rutina requerido."],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Descripción requerida."],
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  myExercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MyExercise",
    },
  ],
});

const Routine = model("Routine", routineSchema);

module.exports = Routine;