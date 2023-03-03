let db = require("../database/models");
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

let userController = {
    register: function(req, res) {
        res.render("register");
    },
    login: function(req, res) {
        res.render("login");
    },
    guardado: function(req, res) {
        const resulltValidation = validationResult(req);
        
        if (resulltValidation.errors.length > 0) {
            return res.render('register', {
                errors: resulltValidation.mapped(),
                oldData: req.body
            });
        } else {
            db.User.findAll()
            .then(function(usuarios){
                  let usuario = usuarios.find(usuario => usuario.mail == req.body.mail);

                //   bcryptjs.hashSync(req.body.password, 10)

                  if(usuario != undefined) {
                    
                    return res.render('register', {
                        mailEnUso: "Esta dirección de correo está en uso",
                        oldData: req.body,
                    });
                  } else {
                    db.User.create({
                        name: req.body.name,
                        mail: req.body.mail,
                        password: req.body.password
                    });
           
                   res.redirect("/user/login");
                  }
             })
             .catch(function(error) {
                console.log(error);
               })
        }
    },
    loguearse: function(req, res) {
        db.User.findAll()
          .then(function(usuarios){
            let usuario = usuarios.find(usuario => usuario.mail == req.body.mail && usuario.password == req.body.password);

            if(req.body.mail == "" || req.body.password == "") {
                res.render("login", {
                    oldData: req.body,
                    errors: "Ambos campos deben ser completados"
                })
            } else {
                if(usuario) {
                    delete usuario.password;
                    req.session.userLogged = usuario;

                    if (req.body.remember_user) {
                        res.cookie('userEmail', req.body.mail, { maxAge: ((60 * 1000) * 60) * 24 });
                    }

                    res.redirect("/user/perfil");



                    // let usuarioPass = bcryptjs.compareSync(req.body.password, usuario.password);
                    // console.log(usuario.password);
                    // console.log(usuarioPass);
                    // if (usuarioPass || req.body.password == usuario.password) {
                    //     res.redirect("/");
                    // }
                } else {
                    res.render("login", {
                        oldData: req.body,
                        credenciales: "Las credenciales son invalidas"
                    });
                }
                    // let usuarioPass = bcryptjs.compareSync(req.body.password, usuario.password);
                    // if (usuarioPass || req.body.password == usuario.password) {
                    //     res.redirect("/");
                    // } else {
                    //     console.log(usuario.password);
                    //     res.render("login", {
                    //         oldData: req.body,
                    //         credenciales: "Las credenciales son invalidas"
                    //     });
                    // }
            }
           })
           .catch(function(error) {
            console.log(error);
           })
           
        },
        perfil: function(req, res) {
            let pedidoMarcas = db.Marca.findAll();

            let pedidoAutos = db.Auto.findAll({ include: [{association: "marca"}] }) 

            Promise.all([pedidoAutos, pedidoMarcas])
            .then(function([autos, marcas]) {

                let autosUser = autos.filter(autosUser => autosUser.user_id == req.session.userLogged.id);

                res.render("perfil", { 
                    marcas:marcas,
                    user: req.session.userLogged,
                    autos: autosUser
                  });
            })
        },
        logout: function(req, res) {
            res.clearCookie('userEmail');
            req.session.destroy();
            return res.redirect('/');
        }
}

module.exports = userController;