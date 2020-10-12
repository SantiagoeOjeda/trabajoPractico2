var express = require('express');
var router = express.Router();
var peliculasController = require('../controllers/peliculasController')

const creacionValidator = require('../validations/creacionValidator')

// listado
router.get('/', peliculasController.lista)

// Crear
router.get('/crear', peliculasController.crear)
router.post('/crear', peliculasController.subir)

// Detalle
router.get('/:id', peliculasController.detail)

// Editar
router.get('/editar/:id', peliculasController.editar)
router.put('/editar/:id', peliculasController.actualizar)

// Eliminar
router.delete('/eliminar/:id', peliculasController.eliminar)

module.exports = router;
