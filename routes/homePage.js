var express = require('express');
var router = express.Router();
var homePageController = require("../controllers/homePageController");

router.get("/", homePageController.index);

router.get("/ofertas", homePageController.ofertas);

router.get("/marcas", homePageController.marcasMobile);

router.get("/marcas/:id", homePageController.marcas);

router.get("/perfil", homePageController.perfil);

module.exports = router;