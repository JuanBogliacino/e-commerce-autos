let db = require("../database/models");
let Op = db.Sequelize.Op;
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
            marca_id: req.body.marca,
            user_id: req.session.userLogged.id
        });

        res.redirect("/");
        }
    },
    listado: function(req, res) {
        let pedidoAutos = db.Auto.findAll({ include: [{association: "marca"}] })
        let pedidoMarcas = db.Marca.findAll()

        Promise.all([pedidoAutos, pedidoMarcas])
        .then(function([autos, marcas]) {
            res.render("listadoAutos", {autos:autos, marcas:marcas});
        })
    },
    detalle: function(req, res) {
        let pedidoAuto = db.Auto.findByPk(req.params.id, {
            include: [{association: "marca"}]
        });

        let pedidoMarcas = db.Marca.findAll();

        let pedidoAutos = db.Auto.findAll({ include: [{association: "marca"}] })

        Promise.all([pedidoAuto, pedidoMarcas, pedidoAutos])
        .then(function([auto, marcas, autos]) {
            let autosMarca = autos.filter(autosMarca => autosMarca.marca_id == auto.marca_id)
            
            let resultado = []
            for (let i = 0; i < autosMarca.length; i++) {
                if (autosMarca[i].id != auto.id) {
                    resultado.push(autosMarca[i])
                }
            }

            res.render("detalleAuto", {auto:auto, marcas:marcas, autosMarca:resultado});
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
                marca_id: req.body.marca,
                user_id: req.session.userLogged.id
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

        res.redirect("/user/perfil");
    },
    search: function(req, res) {
        let pedidoAutos = db.Auto.findAll({ 
            include: [{association: "marca"}],
            where: {
                model: {[Op.like]: '%' +  req.body.search + '%'}
            } 
        })
        let pedidoMarcas = db.Marca.findAll()

        Promise.all([pedidoAutos, pedidoMarcas])
        .then(function([autos, marcas]) {
            res.render("search", {autos:autos, marcas:marcas});
        })
    }
}

module.exports = autosController;