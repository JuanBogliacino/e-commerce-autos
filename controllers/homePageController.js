let db = require("../database/models");

let homePageController = {
    index: function(req, res) {
        let pedidoAutos = db.Auto.findAll({ include: [{association: "marca"}] })
        let pedidoMarcas = db.Marca.findAll()

        Promise.all([pedidoAutos, pedidoMarcas])
        .then(function([autos, marcas]) {
            res.render("homePage", {autos:autos, marcas:marcas});
        })
    },
    ofertas: function(req, res) {
        let pedidoAutos = db.Auto.findAll({ include: [{association: "marca"}] })
        let pedidoMarcas = db.Marca.findAll()

        Promise.all([pedidoAutos, pedidoMarcas])
        .then(function([autos, marcas]) {
            let autosOf = autos.filter(autosOf => autosOf.discount > 0);
            res.render("ofertas", {autosOf:autosOf, marcas:marcas})
        })
    },
    marcasMobile: function(req, res) {
        db.Marca.findAll()
        .then(function(marcas) {
            res.render("marcasMobile", { marcas:marcas });
        })
    },
    marcas: function(req, res) {
        let pedidoAutos = db.Auto.findAll({ include: [{association: "marca"}] })

        let pedidoMarcas = db.Marca.findAll()

        Promise.all([pedidoAutos, pedidoMarcas])
        .then(function([autos, marcas]) {
            let marcaId = marcas.find(marcaId => marcaId.id == req.params.id);

            if (marcaId != undefined) {
                let autosMarca = autos.filter(autosMarca => autosMarca.marca_id == marcaId.id)

                res.render("marcas", { autosMarca:autosMarca, marcas:marcas });
            }
        })
    },
    perfil: function(req, res) {
        let pedidoMarcas = db.Marca.findAll();

        pedidoMarcas.then(function(marcas) {
            res.render("perfil", { marcas:marcas });
        })
    }
}

module.exports = homePageController;