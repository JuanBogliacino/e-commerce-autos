let db = require("../database/models");
const { validationResult } = require('express-validator');

let autosController = {
    crear: function (req, res) {
        db.Marca.findAll()
        .then(function(marcas) {
            return res.render("creacionAutos", {marcas:marcas});
        })
    },
    guardado: function(req, res) {
        const resulltValidation = validationResult(req);
        
        if (resulltValidation.errors.length > 0) {
            db.Marca.findAll()
            .then(function(marcas) {
                return res.render('creacionAutos', {
                    errors: resulltValidation.mapped(),
                    oldData: req.body,
                    marcas: marcas  
                });
            })
        } else {
             db.Auto.create({
            model: req.body.model,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            img: req.file.filename,
            marca_id: req.body.marca
        });

        res.redirect("/");
        }
    },
    listado: function(req, res) {
        db.Auto.findAll()
        .then(function(autos) {
            res.render("listadoAutos", {autos:autos})
        })
    },
    detalle: function(req, res) {
        let pedidoAuto = db.Auto.findByPk(req.params.id, {
            include: [{association: "marca"}]
        });

        let pedidoMarcas = db.Marca.findAll();

        Promise.all([pedidoAuto, pedidoMarcas])
        .then(function([auto, marcas]) {
            res.render("detalleAuto", {auto:auto, marcas:marcas});
        })
    },
    editar: function(req, res) {
        let pedidoAuto = db.Auto.findByPk(req.params.id);

        let pedidoMarcas = db.Marca.findAll();

        Promise.all([pedidoAuto, pedidoMarcas])
        .then(function([auto, marcas]) {
            res.render("editarAuto", {auto:auto, marcas:marcas});
        })
    },
    actualizar: function(req, res) {
        const resulltValidation = validationResult(req);
        
        if (resulltValidation.errors.length > 0) {
            let pedidoAuto = db.Auto.findByPk(req.params.id);

            let pedidoMarcas = db.Marca.findAll();

            Promise.all([pedidoAuto, pedidoMarcas])
            .then(function([auto, marcas]) {
            res.render("editarAuto", {
                errors: resulltValidation.mapped(),
                auto:auto, 
                marcas:marcas
            });
        })
        } else {
            db.Auto.update({
                model: req.body.model,
                price: req.body.price,
                discount: req.body.discount,
                description: req.body.description,
                img: req.file.filename,
                marca_id: req.body.marca
            }, {
                where: {
                    id: req.params.id
                }
            });
    
            res.redirect("/autos/" + req.params.id);
        }        
    },
    borrar: function(req, res) {
        db.Auto.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect("/");
    }
}

module.exports = autosController;