let db = require("../database/models");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

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
                let passEncriptada = bcrypt.hashSync(req.body.password);

                  let usuario = usuarios.find(usuario => usuario.mail == req.body.mail);

                  if(usuario != undefined) {
                    
                    return res.render('register', {
                        mailEnUso: "Esta dirección de correo está en uso",
                        oldData: req.body,
                    });
                  } else {
                    db.User.create({
                        name: req.body.name,
                        mail: req.body.mail,
                        password: passEncriptada
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
            let usuario = usuarios.find(usuario => usuario.mail == req.body.mail);

            if(req.body.mail == "" || req.body.password == "") {
                res.render("login", {
                    oldData: req.body,
                    errors: "Ambos campos deben ser completados"
                })
            } else {
                if(usuario != undefined) {
                    let usuarioPass = bcrypt.compareSync(req.body.password, usuario.password);
                    if (usuarioPass == true || req.body.password == usuario.password) {
                        res.redirect("/");
                    } else {
                        console.log(usuarioPass);
                        res.render("login", {
                            oldData: req.body,
                            credenciales: "Las credenciales son invalidas"
                        });
                    }
                } else {
                    res.render("login", {
                        oldData: req.body,
                        credenciales: "Las credenciales son invalidas"
                    });
                }
            }
           })
           .catch(function(error) {
            console.log(error);
           })
           
        }
}

module.exports = userController;