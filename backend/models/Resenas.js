'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Resenaschema = Schema({
    OpRestaurante: String,
    OpComida: String,
    CalificacionR: Number,
    CalificacionC: Number,
    cantidad: Number,
    Recomendacion:String,
    Correo: String,
});

module.exports = mongoose.model('Resenas', Resenaschema);
