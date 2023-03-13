let db = require("../../database/models");

const marcasAPIController = {
    list: (req, res) => {
        db.Marca.findAll()
        .then(marcas => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: marcas.length,
                    url: 'api/marcas'
                },
                data: marcas
            }
                res.json(respuesta);
            })
    },
    
    detail: (req, res) => {
        db.Marca.findByPk(req.params.id)
            .then(marca => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: marca.length,
                        url: '/api/marcas/:id'
                    },
                    data: marca
                }
                res.json(respuesta);
            });
    },
    marcaAutos: (req, res) => {
        db.Marca.findByPk(req.params.id,{
            include: ['autos']
        })
            .then(marca => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: marca.length,
                        url: '/api/marcas/:id/autos'
                    },
                    data: marca
                }
                res.json(respuesta);
            });
    }
}

module.exports = marcasAPIController;