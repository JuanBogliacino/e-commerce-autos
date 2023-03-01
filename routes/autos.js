var express = require('express');
var router = express.Router();
var autosController = require("../controllers/autosController");

const { body } = require('express-validator');

const validations = [
    body('model').notEmpty().withMessage('Tienes que escribir un modelo'),
    body('price').notEmpty().withMessage('Tienes que ponerle un precio'),
	body('img').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = [".jpg", ".png"]
		if (!file) {
			throw new Error("Tienes que subir una imagen");
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`);
			}
		}		

		return true;
	}),
	body("discount").custom((value, { req }) => {
		if (req.body.discount < 0 || req.body.discount > 99) {
			throw new Error("Ese descuento no es posible");
		}
		return true;
	})
];

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images/autos');
	},
	filename: (req, file, cb) => {
		let fileName = file.originalname + "-" + Date.now() + path.extname(file.originalname);
		cb(null, fileName);
	}
})

const uploadFile = multer({ storage });

//Creación
router.get("/crear", autosController.crear);
router.post("/crear", uploadFile.single("img"), validations, autosController.guardado);

//Lectura
router.get("/" , autosController.listado);

//Detalle 
router.get("/:id" , autosController.detalle);

//Actualizacion
router.get("/editar/:id", autosController.editar);
router.post("/editar/:id", uploadFile.single("img"), validations, autosController.actualizar);

//Borrado
router.post("/borrar/:id", autosController.borrar);

module.exports = router;