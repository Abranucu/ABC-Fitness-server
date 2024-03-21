const router = require("express").Router();

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

const exerciseRouter = require("./exercise.routes");
router.use("/exercises", exerciseRouter);

const routineRouter = require("./routine.routes");
router.use("/routines", routineRouter);

const profileRouter = require("./profile.routes");
router.use("/profile", profileRouter);

const myExerciseRouter = require("./myExercise.routes");
router.use("/routines", myExerciseRouter);

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

module.exports = router;
