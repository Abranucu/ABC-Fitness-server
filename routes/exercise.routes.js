const router = require("express").Router();

const Exercise = require("../models/Exercise.model");

const {
  isTokenValid,
  isUserAdmin,
} = require("../middlewares/auth.middlewares");

// GET "/api/exercises" => listar todos los ejercicios de la DB
router.get("/", isTokenValid, async (req, res, next) => {
  try {
    const allExercises = await Exercise.find();
    res.status(200).json(allExercises);
  } catch (err) {
    next(err);
  }
});

// GET "/api/exercises/:exerciseId" => listar un ejercicio de la DB por su id
router.get("/:exerciseId", isTokenValid, async (req, res, next) => {
  const { exerciseId } = req.params;
  try {
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }
    res.status(200).json(exercise);
  } catch (err) {
    next(err);
  }
});

// POST "/api/exercises" => crear un nuevo ejercicio en la DB
router.post("/", isTokenValid, isUserAdmin, async (req, res, next) => {
  const {
    name,
    initialPosition,
    execution,
    advice,
    involvedMuscles,
    involvedMusclesImg,
    img,
    video,
  } = req.body;
  try {
    // Validar que el ejercicio no existe en la DB
    const foundExercise = await Exercise.findOne({ name: name });
    if (foundExercise !== null) {
      return res.status(400).json({
        message:
          "Ya existe un ejercicio con este nombre. Por favor, utiliza otro nombre.",
      });
    }

    // Crear el ejercicio en la DB
    await Exercise.create({
      name,
      initialPosition,
      execution,
      advice,
      involvedMuscles,
      involvedMusclesImg,
      img,
      video,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

// PUT "/api/exercises/:exerciseId" => editar un ejercicio de la DB por su id
router.put(
  "/:exerciseId",
  isTokenValid,
  isUserAdmin,
  async (req, res, next) => {
    const { exerciseId } = req.params;
    try {
      const updatedExercise = await Exercise.findByIdAndUpdate(
        exerciseId,
        req.body,
        { new: true }
      );
      if (!updatedExercise) {
        return res.status(404).json({ message: "Ejercicio no encontrado" });
      }
      res.status(200).json(updatedExercise);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE "/api/exercises/:exerciseId" => eliminar un ejercicio de la DB por su id
router.delete(
  "/:exerciseId",
  isTokenValid,
  isUserAdmin,
  async (req, res, next) => {
    const { exerciseId } = req.params;
    try {
      const exercise = await Exercise.findByIdAndDelete(exerciseId);
      if (!exercise) {
        return res.status(404).json({ message: "Ejercicio no encontrado" });
      }
      res.status(204).json({ message: "Ejercicio eliminado correctamente" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
