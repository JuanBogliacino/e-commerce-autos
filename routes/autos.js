var express = require('express');
var router = express.Router();
var autosController = require("../controllers/autosController");

const { body } = require('express-validator');

const validations = [
    body('model').notEmpty().withMessage('Tienes que escribir un modelo'),
    body('price').notEmpty().withMessage('Tienes que ponerle un precio')
];

// const path = require('path');
// const multer = require('multer');

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'public/images/autos');
// 	},
// 	filename: (req, file, cb) => {
// 		let fileName = file.originalname;
// 		cb(null, fileName);
// 	}
// })

// const uploadFile = multer({ storage });

//Creación
router.get("/crear", autosController.crear);
router.post("/crear", validations , autosController.guardado);

//Lectura
router.get("/" , autosController.listado);

//Detalle 
router.get("/:id" , autosController.detalle);

//Actualizacion
router.get("/editar/:id", autosController.editar);
router.post("/editar/:id", autosController.actualizar);

//Borrado
router.post("/borrar/:id", autosController.borrar);

module.exports = router;