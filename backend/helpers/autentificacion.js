'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "Mp(uI)@}Ec}@<x_*h-.~97<ZAig?cnwu";

function obtenerTokenUsuario(usuario) {
    var payload = {
        sub: usuario._id,
        name: usuario.nombre,
        correo: usuario.correo,
        iat: moment().unix(),
        exp: moment().add(1000, 'minutes').unix()
    };
    return jwt.encode(payload, secret);
}

function validarTokenUsuario(req, resp, nextStep) {
    try {
        var tokenEnviadoPorUsuario = req.headers.authorization;
        if (!tokenEnviadoPorUsuario) {
            return resp.status(403).send({ message: "Token no proporcionado" });
        }

        var tokenLimpio = tokenEnviadoPorUsuario.replace("Bearer ", "");
        var payload = jwt.decode(tokenLimpio, secret);

        if (payload.exp <= moment().unix()) {
            return resp.status(401).send({ message: "Token ha expirado" });
        }

        req.user = payload;
        nextStep();
    } catch (ex) {
        resp.status(403).send({ message: "Token Invalido", details: ex.message });
    }
}

module.exports = {
    obtenerTokenUsuario,
    validarTokenUsuario
};
