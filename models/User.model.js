const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Nombre requerido."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Apellido requerido."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email requerido."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Contraseña requerida."],
    },
    age: {
      type: Number,
      required: [true, "Edad requerida."],
    },
    sex: {
      type: String,
      required: [true, "Sexo requerido."],
      enum: ["Masculino", "Femenino"],
    },
    height: {
      type: Number,
      required: [true, "Altura requerida."],
    },
    weight: {
      type: Number,
      required: [true, "Peso requerido."],
    },
    currentLevel: {
      type: String,
      required: true,
      enum: ["Bajo", "Intermedio", "Alto"],
    },
    goal: {
      type: String,
      required: true,
      enum: ["Perdida de grasa", "Mantenimiento", "Ganancia muscular"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
