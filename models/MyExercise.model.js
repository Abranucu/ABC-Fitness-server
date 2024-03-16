const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const myExerciseSchema = new Schema({
  sets: {
    type: Number,
    required: [true, "Numero de series requerido."],
  },
  repetitions: {
    type: Number,
    required: [true, "Numero de repeticiones requerido."],
  },
  weight: {
    type: Number,
    required: [true, "Numero de Kg requerido."],
  },
  rest: {
    type: Number,
    required: [true, "Numero de segundos de descanso entre series requerido."],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
  },
  routine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Routine",
  },
});

const MyExercise = model("MyExercise", myExerciseSchema);

module.exports = MyExercise;
