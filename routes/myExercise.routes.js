const router = require("express").Router();

const MyExercise = require("../models/MyExercise.model");
const Exercise = require("../models/Exercise.model");

// POST "/api/routines/:routineId/exercises" => Crea un nuevo ejercicio en una rutina específica.
router.post("/", async (req, res, next) => {
  const { routineId } = req.params;
  const { exercise, sets, repetitions, weight, rest } = req.body;
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
      exercise: selectedExercise._id,
      sets,
      repetitions,
      weight,
      rest,
      routine: routineId,
      user: userId,
    });
    res.status(201).json(newMyExercise);
  } catch (err) {
    next(err);
  }
});

// PATCH "/api/routines/:routineId/exercises/:exerciseId" => Edita un ejercicio específico en una rutina específica.
router.patch("/:exerciseId", async (req, res, next) => {
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
});

// DELETE "/api/routines/:routineId/exercises/:exerciseId" =>  Elimina un ejercicio específico de una rutina específica.
router.delete("/:exerciseId", async (req, res, next) => {
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
});

module.exports = router;
