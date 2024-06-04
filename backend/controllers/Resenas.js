'use strict';

var Resenas = require("../models/Resenas");
var authController = require('./autenticacion');

function crearResena(req, resp) {
    var payload = authController.decryptToken(req);
    if (payload.rol == 'usuario' || payload.rol == 'administrador') {
        return resp.status(403).send({ message: "No tienes permiso para realizar esta acción." });
    }
    var parametrosResena = req.body;
    var nuevaResena = new Resenas();
    nuevaResena.OpRestaurante = parametrosResena.OpRestaurante;
    nuevaResena.OpComida = parametrosResena.OpComida;
    nuevaResena.CalificacionR = parametrosResena.CalificacionR;
    nuevaResena.CalificacionC = parametrosResena.CalificacionC;
    nuevaResena.Recomendacion = parametrosResena.Recomendacion;
    nuevaResena.cantidad = parametrosResena.cantidad;
    nuevaResena.Correo = payload.correo;
    nuevaResena.NumeroReseña =parametrosResena.NumeroReseña;
    nuevaResena.save().then(
        (ResenaGuardado) => {
            resp.status(200).send({ ResenaCreado: ResenaGuardado });
        },
        err => {
            resp.status(500).send({ message: "No se pudo crear el Resena. Intente nuevamente" });
        }
    );
}

function consultarmiResenas(req, res) {
    var payload = authController.decryptToken(req);
    const correo = payload.correo
    Resenas.find({Correo:correo}).exec()
        .then(Resenas => {
            res.status(200).send({ Resenas: Resenas });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al recuperar los Resenas." });
        });
}
function actualizarResena(req, res) {
    var payload = authController.decryptToken(req);
    var resenaId = req.params._id;
    console.log(resenaId);
    var parametrosResena = req.body;

    Resenas.findOneAndUpdate(
        { _id: resenaId, Correo: payload.correo },
        {
            OpRestaurante: parametrosResena.OpRestaurante,
            OpComida: parametrosResena.OpComida,
            CalificacionR: parametrosResena.CalificacionR,
            CalificacionC: parametrosResena.CalificacionC,
            Recomendacion: parametrosResena.Recomendacion,
            cantidad: parametrosResena.cantidad
        },
        { new: true }
    ).then(
        (ResenaActualizada) => {
            if (!ResenaActualizada) {
                return res.status(404).send({ message: "Reseña no encontrada o no tienes permiso para actualizarla." });
            }
            res.status(200).send({ ResenaActualizada: ResenaActualizada });
        },
        err => {
            res.status(500).send({ message: "No se pudo actualizar la reseña. Intente nuevamente." });
        }
    );
}
function eliminarResena(req, res) {
    var payload = authController.decryptToken(req);
    var resenaId = req.params._id;

    Resenas.findOneAndDelete({ _id: resenaId, Correo: payload.correo })
        .then((resenaEliminada) => {
            if (!resenaEliminada) {
                return res.status(404).send({ message: "Reseña no encontrada o no tienes permiso para eliminarla." });
            }
            res.status(200).send({ message: "Reseña eliminada correctamente." });
        })
        .catch((err) => {
            res.status(500).send({ message: "No se pudo eliminar la reseña. Intente nuevamente." });
        });
}

module.exports = {
    crearResena,
    consultarmiResenas,
    actualizarResena,
    eliminarResena 
};

