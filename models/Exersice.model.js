const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nombre del ejercicio requerido."],
    unique: true,
    trim: true,
  },
  initialPosition: {
    type: String,
    required: [true, "Posición inicial requerida."],
    trim: true,
  },
  execution: {
    type: String,
    required: [true, "Ejecución requerida."],
    trim: true,
  },
  advice: {
    type: String,
    required: [true, "Consejo requerido."],
    trim: true,
  },

  involvedMuscles: {
    type: [String],
    required: [true, "Músculos involucrados requeridos."],
    enum: [
      "Abdominales",
      "Antebrazos",
      "Bíceps",
      "Cuádriceps",
      "Cuello y trapecio superior",
      "Dorsal ancho",
      "Erectores espinales",
      "Isquiotibiales",
      "Glúteos y flexores de cadera",
      "Hombros",
      "Espalda baja",
      "Manos-muñecas",
      "Oblicuos",
      "Gemelos",
      "Pectorales",
      "Pies-tobillos",
      "Cuerpo entero",
      "Trapecio medio e inferior",
      "Tríceps",
    ],
    trim: true,
  },
  involvedMusclesImg: String,
  img: String,
  video: String,
});

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
