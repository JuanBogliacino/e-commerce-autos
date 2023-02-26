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

router.get("/register", userController.register);
router.post("/register", validations, userController.guardado);

router.get("/login", userController.login);
router.post("/login", userController.loguearse);

module.exports = router;