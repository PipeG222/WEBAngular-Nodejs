'use strict'

var express = require('express');
var Controller = require('../controllers/Resenas');
var authController = require('../controllers/autenticacion');
var token = require('../helpers/autentificacion');

var routes = express.Router();

routes.delete('/api/ResenasD/:_id', token.validarTokenUsuario, Controller.eliminarResena);
routes.put('/api/ResenasU/:_id', token.validarTokenUsuario, Controller.actualizarResena);
routes.post('/api/ResenasC', token.validarTokenUsuario, Controller.crearResena);
routes.get('/api/Resenas', token.validarTokenUsuario, Controller.consultarmiResenas);
routes.post('/api/usuario/crear', authController.registrarUsuario);
routes.post('/api/usuario/iniciarsesion', authController.iniciarSesion);

module.exports = routes;
