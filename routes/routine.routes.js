const router = require("express").Router();

const Routine = require("../models/Routine.model");
const MyExercise = require("../models/MyExercise.model");

const { isTokenValid } = require("../middlewares/auth.middlewares");

// GET "/api/routines" => Lista todas las rutinas de la DB
router.get("/", isTokenValid, async (req, res, next) => {
  try {
    const allRoutines = await Routine.find();
    res.status(200).json(allRoutines);
  } catch (err) {
    next(err);
  }
});

// GET "/api/routines/user/:userId" => Lista todas las rutinas de un usuario específico
router.get("/user/:userId", isTokenValid, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const allUserRoutines = await Routine.find({ user: userId });
    res.status(200).json(allUserRoutines);
  } catch (err) {
    next(err);
  }
});

// GET "/api/routines/:routineId" => Lista una rutina de la DB por su id
router.get("/:routineId", isTokenValid, async (req, res, next) => {
  const { routineId } = req.params;
  try {
    // Busca la rutina por su id
    const routine = await Routine.findById(routineId);
    if (!routine) {
      return res.status(404).json({ message: "Rutina no encontrada." });
    }

    // Busca los ejercicios relacionados con la rutina
    const exercises = await MyExercise.find({ routine: routineId }).populate(
      "exercise"
    );
    res.status(200).json({ routine, exercises });
  } catch (err) {
    next(err);
  }
});

// POST "/api/routines" => Crea una nueva rutina en la DB
router.post("/", isTokenValid, async (req, res, next) => {
  const { name, description } = req.body;
  const userId = req.payload._id;

  // Validar los datos recibidos
  if (!name || !description) {
    return res.status(400).json({
      message: "Todos los campos obligatorios deben ser proporcionados.",
    });
  }

  try {
    // Crear el ejercicio en la DB
    await Routine.create({
      name,
      description,
      user: userId,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

// PATCH "/api/routines/:routineId" => Edita una rutina de la DB por su id
router.patch("/:routineId", isTokenValid, async (req, res, next) => {
  const { routineId } = req.params;
  const { name, description } = req.body;

  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(
      routineId,
      { name, description },
      { new: true }
    );
    if (!updatedRoutine) {
      return res.status(404).json({ message: "Rutina no encontrada." });
    }
    res
      .status(200)
      .json({ message: "Rutina actualizada correctamente.", updatedRoutine });
  } catch (err) {
    next(err);
  }
});

// DELETE "/api/routines/:routineId" => Elimina una rutina de la DB por su id
router.delete("/:routineId", isTokenValid, async (req, res, next) => {
  const { routineId } = req.params;
  try {
    const routine = await Routine.findByIdAndDelete(routineId);
    if (!routine) {
      return res.status(404).json({ message: "Rutina no encontrada." });
    }
    res.status(204).json({ message: "Rutina eliminada correctamente." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
