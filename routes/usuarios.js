const express = require('express');

const usuariosController = require('../controllers/usuarios');

const router = express.Router();

router.get('/', usuariosController.getAllUsuarios);

router.post('/login', usuariosController.loginUser);

router.post('/register', usuariosController.postUsuarios);

router.put('/', usuariosController.putUsuarios);

router.delete('/:id', usuariosController.deleteUsuarios);

module.exports = router;
