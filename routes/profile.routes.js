const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");

const { isTokenValid } = require("../middlewares/auth.middlewares");

// GET "/api/profile" => Lista los detalles del usuario que está conectado
router.get("/", isTokenValid, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const userProfile = await User.findById(userId);
    if (userProfile) {
      res.status(200).json(userProfile);
    } else {
      res.status(404).json({ message: "Perfil de usuario no encontrado." });
    }
  } catch (err) {
    next(err);
  }
});

// PATCH "/api/profile" => Edita los datos del usuario que está conectado
router.patch("/", isTokenValid, async (req, res, next) => {
  const userId = req.payload._id;
  const { height, weight, currentLevel, goal } = req.body;

  // Comprobar que todos los campos obligatorios están llenos
  if (!height || !weight || !currentLevel || !goal) {
    return res
      .status(400)
      .json({ message: "Por favor, complete todos los campos obligatorios." });
  }
  try {
    const editedUserProfile = await User.findByIdAndUpdate(
      userId,
      {
        height,
        weight,
        currentLevel,
        goal,
      },
      { new: true }
    );
    if (editedUserProfile) {
      res.status(200).json(editedUserProfile);
    } else {
      res.status(404).json({ message: "Perfil de usuario no encontrado." });
    }
  } catch (err) {
    next(err);
  }
});

// PATCH "/api/profile/password" => Actualiza la contraseña del usuario que está conectado
router.patch("/password", isTokenValid, async (req, res, next) => {
  const userId = req.payload._id;
  const { currentPassword, newPassword } = req.body;

  try {
    // Buscar el usuario por su ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Verificar si la contraseña actual es correcta
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "La contraseña actual proporcionada es incorrecta." });
    }

    // Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar la contraseña del usuario
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente." });
  } catch (err) {
    next(err);
  }
});

// PATCH "/api/profile/name-and-lastname" => Actualiza el nombre y apellidos del usuario que está conectado
router.patch("/name-and-lastname", isTokenValid, async (req, res, next) => {
  const userId = req.payload._id;
  const { name, lastName, password } = req.body;
  // Comprobar que todos los campos obligatorios están llenos
  if (!name || !lastName || !password) {
    return res
      .status(400)
      .json({ message: "Por favor, complete todos los campos obligatorios." });
  }
  try {
    // Buscar el usuario por su ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Verificar si la contraseña actual es correcta
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "La contraseña actual proporcionada es incorrecta." });
    }

    // Actualizar nombre y apellidos del usuario
    user.name = name;
    user.lastName = lastName;
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente." });
  } catch (err) {
    next(err);
  }
});

// PATCH "/api/profile/email" => Actualiza el email del usuario que está conectado
router.patch("/email", isTokenValid, async (req, res, next) => {
  const userId = req.payload._id;
  const { email, password } = req.body;
  // Comprobar que todos los campos obligatorios están llenos
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Por favor, complete todos los campos obligatorios." });
  }
  try {
    // Buscar el usuario por su ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Verificar si la contraseña actual es correcta
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "La contraseña actual proporcionada es incorrecta." });
    }

    // Actualizar email del usuario
    user.email = email;
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente." });
  } catch (err) {
    next(err);
  }
});

// PATCH "/api/profile/profile-pic" => Actualiza la imagen de perfil del usuario que está conectado
router.patch("/profile-pic", isTokenValid, async (req, res, next) => {
  const userId = req.payload._id;
  const { profilePic, password } = req.body;
  // Comprobar que todos los campos obligatorios están llenos
  if (!profilePic || !password) {
    return res
      .status(400)
      .json({ message: "Por favor, complete todos los campos obligatorios." });
  }
  try {
    // Buscar el usuario por su ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Verificar si la contraseña actual es correcta
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "La contraseña actual proporcionada es incorrecta." });
    }

    // Actualizar foto de perfil del usuario
    user.profilePic = profilePic;
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
