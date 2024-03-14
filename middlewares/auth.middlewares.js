const jwt = require("jsonwebtoken");

function isTokenValid(req, res, next) {
  try {
    const tokenArr = req.headers.authorization.split(" ");
    const token = tokenArr[1];
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.payload = payload;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "No autorizado. Token inválido o expirado." });
  }
}

function isUserAdmin(req, res, next) {
  if (req.payload.role === "admin") {
    next();
  } else {
    res
      .status(401)
      .json({
        message:
          "Acceso denegado. Esta función requiere privilegios de administrador.",
      });
  }
}

module.exports = {
  isTokenValid,
  isUserAdmin,
};
