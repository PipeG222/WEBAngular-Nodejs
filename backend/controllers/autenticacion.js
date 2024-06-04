'use strict';

var Usuario = require('../models/usuarios');
var tokenHelper = require('../helpers/autentificacion');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');

function validarContrasena(password) {
    const minLength = 8;
    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])/;

    if (password.length < minLength) {
        return { isValid: false, message: "La contraseña debe tener al menos 8 caracteres." };
    }

    const criteriaMet = [
        /[a-z]/.test(password),  // Minúscula
        /[A-Z]/.test(password),  // Mayúscula
        /[0-9]/.test(password),  // Número
        /[\W_]/.test(password)   // Símbolo especial
    ].filter(Boolean).length;

    if (criteriaMet < 3) {
        return { isValid: false, message: "La contraseña debe cumplir al menos 3 de las siguientes condiciones: una letra minúscula, una letra mayúscula, un número, un símbolo especial." };
    }

    return { isValid: true, message: "" };
}

function registrarUsuario(req, resp) {
    var parametros = req.body;

    const { isValid, message } = validarContrasena(parametros.password);
    if (!isValid) {
        return resp.status(400).send({ message });
    }

    var salt = bcrypt.genSaltSync(15);
    var contrasenaEncriptada = bcrypt.hashSync(parametros.password, salt);

    var nuevaUsuario = new Usuario();
    nuevaUsuario.nombre = parametros.nombre;
    nuevaUsuario.apellidos = parametros.apellidos;
    nuevaUsuario.rol = parametros.rol;
    nuevaUsuario.correo = parametros.correo;
    nuevaUsuario.celular = parametros.celular;
    nuevaUsuario.password = contrasenaEncriptada;

    nuevaUsuario.save().then(
        (usuarioGuardado) => {
            resp.status(200).send({ usuarioCreado: usuarioGuardado });
        },
        err => {
            resp.status(500).send({ message: "No se pudo crear el usuario. Intente nuevamente" });
        }
    );
}

function decryptToken(req) {
    var tokenEnviadoPorUsuario = req.headers.authorization;
    var tokenLimpio = tokenEnviadoPorUsuario.replace("Bearer ", "");
    var secret = "Mp(uI)@}Ec}@<x_*h-.~97<ZAig?cnwu";
    var payload = jwt.decode(tokenLimpio, secret);
    return payload;
}

function iniciarSesion(req, resp) {
    var parametros = req.body;

    var correoIngresado = parametros.correo;
    var passwordIngresado = parametros.password;

    Usuario.findOne({ correo: correoIngresado }).then(
        (usuarioEncontrado) => {
            if (!usuarioEncontrado) {
                resp.status(403).send({ message: "No existe usuario" });
            } else {
                if (bcrypt.compareSync(passwordIngresado, usuarioEncontrado.password)) {
                    resp.status(200).send({ 
                        message: "Usuario logueado", 
                        token: tokenHelper.obtenerTokenUsuario(usuarioEncontrado) 
                    });
                } else {
                    resp.status(403).send({ message: "Contrasena no valida" });
                }
            }
        },
        err => {
            resp.status(500).send({ message: "No se pudo validar las credenciales, intente de nueva" });
        }
    );
}

module.exports = {
    registrarUsuario,
    iniciarSesion,
    decryptToken
};
