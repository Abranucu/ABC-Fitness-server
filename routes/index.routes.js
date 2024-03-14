const router = require("express").Router();

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

const exerciseRouter = require("./exercise.routes");
router.use("/exercises", exerciseRouter);

const routineRouter = require("./routine.routes");
router.use("/routines", routineRouter);

module.exports = router;
