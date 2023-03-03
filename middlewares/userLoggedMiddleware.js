let db = require("../database/models");

function userLoggedMiddleware(req, res, next) {

    db.User.findAll()
          .then(function(usuarios) {

    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = usuarios.find(usuario => usuario.mail == emailInCookie);

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
    })
}

module.exports = userLoggedMiddleware;