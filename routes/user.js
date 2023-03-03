var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController");

const { body } = require('express-validator');

const validations = [
    body('name').notEmpty().withMessage('Tienes que escribir un nombre').bail()
    .isLength({min: 3}).withMessage("el nombre debe contener al menos 3 caracteres"),
    body('mail')
    .notEmpty().withMessage('Tienes que escribir un Email').bail()
    .isEmail().withMessage('tienes que escribir un formato de correo valido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña').bail()
    .isLength({min: 3}).withMessage("la contraseña debe contener al menos 3 caracteres")
];

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// formulario de registro
router.get("/register", guestMiddleware, userController.register);

// procesar el registro
router.post("/register", validations, userController.guardado);

// formulario de login
router.get("/login", guestMiddleware, userController.login);

// procesar el login
router.post("/login", userController.loguearse);

// perfil de usuario
router.get("/perfil", authMiddleware, userController.perfil);

// Logout
router.get("/logout", userController.logout);

module.exports = router;