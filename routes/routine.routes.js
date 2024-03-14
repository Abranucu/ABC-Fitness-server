const router = require("express").Router();

const Routine = require("../models/Routine.model");

const {
  isTokenValid,
  isUserAdmin,
} = require("../middlewares/auth.middlewares");

// GET "/api/routines" => listar todas las rutinas de la DB
router.get("/", isTokenValid, async (req, res, next) => {
  try {
    const allRoutines = await Routine.find();
    res.status(200).json(allRoutines);
  } catch (err) {
    next(err);
  }
});

// GET "/api/routines/:routineId" => listar una rutina de la DB por su id
router.get("/:routineId", isTokenValid, async (req, res, next) => {
  const { routineId } = req.params;
  try {
    const routine = await Routine.findById(routineId);
    if (!routine) {
      return res.status(404).json({ message: "Rutina no encontrada" });
    }
    res.status(200).json(routine);
  } catch (err) {
    next(err);
  }
});

// POST "/api/routines" => crear una nueva rutina en la DB
router.post("/", isTokenValid, async (req, res, next) => {
  const { name, description, user, myExercises } = req.body;
  try {
    // Validar que el ejercicio no existe en la DB
    const foundRoutine = await Routine.findOne({ name: name });
    if (foundRoutine !== null) {
      return res.status(400).json({
        message:
          "Ya existe una rutina con este nombre. Por favor, utiliza otro nombre.",
      });
    }

    // Crear el ejercicio en la DB
    await Routine.create({
      name,
      description,
      user,
      myExercises,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

// PUT "/api/routines/:routineId" => editar una rutina de la DB por su id
router.put("/:routineId", isTokenValid, async (req, res, next) => {
  const { routineId } = req.params;
  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(
      routineId,
      req.body,
      { new: true }
    );
    if (!updatedRoutine) {
      return res.status(404).json({ message: "Rutina no encontrada" });
    }
    res.status(200).json(updatedRoutine);
  } catch (err) {
    next(err);
  }
});

// DELETE "/api/routines/:routineId" => eliminar una rutina de la DB por su id
router.delete("/:routineId", isTokenValid, async (req, res, next) => {
  const { routineId } = req.params;
  try {
    const routine = await Routine.findByIdAndDelete(routineId);
    if (!routine) {
      return res.status(404).json({ message: "Rutina no encontrada" });
    }
    res.status(204).json({ message: "Rutina eliminada correctamente" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
