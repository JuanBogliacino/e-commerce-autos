let db = require("../../database/models");
let Op = db.Sequelize.Op;

let autosAPIController = {
    list: (req, res) => {
        db.Auto.findAll({
            include: [{association: "marca"}]
        })
        .then(autos => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: autos.length,
                    url: 'api/autos'
                },
                data: autos
            }
                res.json(respuesta);
            })
    },
    detail: (req, res) => {
        db.Auto.findByPk(req.params.id,
            {
                include: [{association: "marca"}]
            })
            .then(auto => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: auto.length,
                        url: '/api/autos/:id'
                    },
                    data: auto
                }
                res.json(respuesta);
            });
    },
    create: (req,res) => {
        db.Auto.create({
            model: req.body.model,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            img: req.file.filename,
            marca_id: req.body.marca,
            user_id: req.session.userLogged.id
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/autos/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/autos/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    update: (req,res) => {
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
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/autos/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/autos/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    destroy: (req,res) => {
        db.Auto.destroy({
                where: {id: req.params.id}, force: true
            }) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/autos/destroy/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/autos/destroy/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    search: (req, res) => {
        db.Auto
        .findAll({
            where: {
                model: {[Op.like]: '%' + req.query.keyword + '%'}
            }
        })
        .then(autos => {
            if (autos.length > 0) {
                return res.status(200).json(autos);
            } 
                return res.status(200).json("no se encontró el auto solicitado");
        })
    }
}

module.exports = autosAPIController;