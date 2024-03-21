const router = require("express").Router();
const uploader = require("../middlewares/cloudinary.config.js");

// POST "/api/upload"
router.post("/", uploader.single("image"), (req, res, next) => {
  // Verifica si se ha cargado un archivo
  if (!req.file) {
    res.status(400).json({
      errorMessage:
        "Hubo un problema al subir la imagen. Verifica el formato y el tamaño de la imagen.",
    });
    return;
  }

  // Si se ha cargado el archivo correctamente, envía la URL del archivo como respuesta
  // 'imageUrl' puede tener cualquier nombre, pero asegúrate de usar el mismo al accederlo en el frontend (response.data.imageUrl)
  res.json({ imageUrl: req.file.path });
});

module.exports = router;
