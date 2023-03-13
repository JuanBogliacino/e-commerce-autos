const express = require('express');
const router = express.Router();
const autosAPIController = require('../../controllers/api/autosAPIController');

//Listado de autos
router.get('/', autosAPIController.list);

//Detalle de un auto
router.get('/:id', autosAPIController.detail);

//Agregar un auto
router.post('/create', autosAPIController.create);

//Modificar un auto
router.put('/update/:id', autosAPIController.update);

//Eliminar un auto
router.delete('/delete/:id', autosAPIController.destroy);

module.exports = router;