const router = require("express").Router();

const MyExercise = require("../models/MyExercise.model");
const Exercise = require("../models/Exercise.model");
const Routine = require("../models/Routine.model");

const { isTokenValid } = require("../middlewares/auth.middlewares");

// GET "/api/routines/:routineId/exercises" => Obtiene todos los myexercises de una rutina específica
router.get("/:routineId/exercises", isTokenValid, async (req, res, next) => {
  const routineId = req.params.routineId;
  const userId = req.payload._id;

  try {
    // Verificar si la rutina pertenece al usuario
    const routine = await Routine.findOne({ _id: routineId, user: userId });
    if (!routine) {
      return res.status(404).json({
        message: "Rutina no encontrada o no autorizada.",
      });
    }

    // Obtener todos los myexercises de la rutina específica y hacer el populate del ejercicio
    const myExercises = await MyExercise.find({ routine: routineId }).populate(
      "exercise"
    );
    res.status(200).json(myExercises);
  } catch (err) {
    next(err);
  }
});

// POST "/api/routines/:routineId/exercises" => Crea un nuevo ejercicio en una rutina específica.
router.post("/:routineId/exercises", isTokenValid, async (req, res, next) => {
  const { routine, exercise, sets, repetitions, weight, rest } = req.body;
  console.log(req.body);
  const userId = req.payload._id;

  // Validar los datos recibidos
  if (!exercise || !sets || !repetitions || !weight || !rest) {
    return res.status(400).json({
      message: "Todos los campos obligatorios deben ser proporcionados.",
    });
  }

  try {
    // Obtener el ejercicio seleccionado pro su ID
    const selectedExercise = await Exercise.findById(exercise);
    if (!selectedExercise) {
      return res.status(404).json({
        message: "Ejercicio no encontrado.",
      });
    }

    // Crear el nuevo ejercicio en la DB
    const newMyExercise = await MyExercise.create({
      exercise,
      sets,
      repetitions,
      weight,
      rest,
      routine,
      user: userId,
    });
    res.status(201).json(newMyExercise);
  } catch (err) {
    next(err);
  }
});

// PATCH "/api/routines/:routineId/exercises/:exerciseId" => Edita un ejercicio específico en una rutina específica.
router.patch(
  "/:routineId/exercises/:exerciseId",
  isTokenValid,
  async (req, res, next) => {
    const { exerciseId } = req.params;
    const { sets, repetitions, weight, rest } = req.body;

    try {
      const updatedMyExercise = await MyExercise.findByIdAndUpdate(
        exerciseId,
        {
          sets,
          repetitions,
          weight,
          rest,
        },
        { new: true }
      );
      if (!updatedMyExercise) {
        return res.status(404).json({ message: "Ejercicio no encontrado." });
      }
      res.status(200).json({
        message: "Ejercicio actualizado correctamente",
        updatedMyExercise,
      });
    } catch (err) {
      next(err);
    }
  }
);

// DELETE "/api/routines/:routineId/exercises/:exerciseId" =>  Elimina un ejercicio específico de una rutina específica.
router.delete(
  "/:routineId/exercises/:exerciseId",
  isTokenValid,
  async (req, res, next) => {
    const { exerciseId } = req.params;
    try {
      const myExercise = await MyExercise.findByIdAndDelete(exerciseId);
      if (!myExercise) {
        return res.status(404).json({ message: "Ejercicio no encontrado." });
      }
      res.status(204).json({ message: "Ejercicio eliminado correctamente" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
