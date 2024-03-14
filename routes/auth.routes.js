const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

// POST "/api/auth/signup" => recibir los datos del usuario y crear un documento en la DB
router.post("/signup", async (req, res, next) => {
  const {
    name,
    lastName,
    email,
    password,
    age,
    sex,
    height,
    weight,
    currentLevel,
    goal,
  } = req.body;

  // Comprobar que todos los campos obligatorios están llenos
  if (
    !name ||
    !lastName ||
    !email ||
    !password ||
    !age ||
    !sex ||
    !height ||
    !weight ||
    !currentLevel ||
    !goal
  ) {
    res
      .status(400)
      .json({ message: "Por favor, complete todos los campos obligatorios." });
  }

  // Comprobar que la contraseña sea suficientemente segura
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      message:
        "La contraseña debe contener al menos 8 caracteres, incluyendo al menos una mayúscula, una minúscula y un número.",
    });
  }

  // Comprobar que el email tiene el formato correcto
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (emailRegex.test(email) === false) {
    res
      .status(400)
      .json({ message: "Por favor, ingresa un correo electrónico válido." });
  }

  try {
    // Validar que el usuario no existe en la DB
    const foundUser = await User.findOne({ email: email });
    if (foundUser !== null) {
      res.status(400).json({
        message:
          "Ya existe un usuario con este correo electrónico. Por favor, utiliza otro correo electrónico.",
      });
      return;
    }

    // Cifrado de contraseña
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    // Crear el usuario en la DB
    await User.create({
      name,
      lastName,
      email,
      password: hashPassword,
      age,
      sex,
      height,
      weight,
      currentLevel,
      goal,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

// POST "/api/auth/login" => validar las credenciales del usuario y enviar un TOKEN
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  // Comprobar que todos los campos obligatorios están llenos
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Por favor, complete todos los campos obligatorios." });
  }

  try {
    // Validar que el usuario existe en la DB
    const foundUser = await User.findOne({ email: email });
    if (foundUser === null) {
      return res.status(400).json({
        message:
          "No se encontró ningún usuario registrado con este correo electrónico.",
      });
    }

    // Comprobar que la contraseña es correcta
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (isPasswordCorrect === false) {
      return res
        .status(400)
        .json({ message: "La contraseña proporcionada no es correcta." });
    }

    // Generamos el Token y lo enviamos al cliente
    const { _id, role } = foundUser;
    const payload = {
      _id,
      email,
      role,
    };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    res.status(200).json(authToken);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
