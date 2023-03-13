const express = require('express');
const router = express.Router();
const marcasAPIController = require('../../controllers/api/marcasAPIController');

//Listado de todos los marcas
router.get('/', marcasAPIController.list);
//Detalle de la marca
router.get('/:id', marcasAPIController.detail);
//Autos por marca
router.get('/:id/autos', marcasAPIController.marcaAutos);

module.exports = router;