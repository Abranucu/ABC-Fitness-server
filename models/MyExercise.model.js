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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  exercises: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exercise",
  },
});

const MyExercise = model("MyExercise", myExerciseSchema);

module.exports = MyExercise;
