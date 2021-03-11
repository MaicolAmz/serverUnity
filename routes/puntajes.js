const express = require('express');

const puntajesController = require('../controllers/puntajes');

const router = express.Router();

router.get('/', puntajesController.getAllPuntajes);

router.get('/:id', puntajesController.getPuntaje);

router.post('/', puntajesController.postPuntajes);

router.delete('/:id', puntajesController.deletePuntajes);

module.exports = router;
