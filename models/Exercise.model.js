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
      "Músculos del cuello",
      "Trapecio",
      "Hombros",
      "Deltoides",
      "Deltoides anterior",
      "Deltoides lateral",
      "Deltoides posterior",
      "Manguito rotador",
      "Pectorales",
      "Pectorales mayores",
      "Pectorales menores",
      "Espalda",
      "Espalda alta",
      "Dorsal",
      "Dorsal ancho",
      "Romboides",
      "Espalda baja",
      "Lumbares",
      "Erectores espinales",
      "Abdominales",
      "Abdominales oblicuos",
      "Braquial",
      "Bíceps",
      "Tríceps",
      "Antebrazos",
      "Aductores",
      "Abductores",
      "Glúteos",
      "Cadera",
      "Cuádriceps",
      "Isquiotibiales",
      "Tibiales anteriores",
      "Pantorrillas",
      "Gemelos",
      "Flexores de la muñeca",
      "Extensores de la muñeca",
    ],
    trim: true,
  },
  involvedMusclesImg: String,
  img: String,
  video: String,
});

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
