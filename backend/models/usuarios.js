'use strict'

var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: String,
    apellidos: String,
    rol: String,
    password: String,
    correo: String,
    celular: Number
});

module.exports = mongoose.model('usuarios', UsuarioSchema);
