const Usuarios = require('../models/usuarios');
const bcrypt = require('bcryptjs');

exports.getAllUsuarios = async (req, res, next) => {
  try {
    const [allUsuarios] = await Usuarios.fetchAll();
    res.status(200).json(allUsuarios);
  } catch (err) {
    if (!err.statusCode) {
      res.status(500).send({ done: false, message: 'Error' });
    }
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const [usuarios] = await Usuarios.getUser(req.body.username);
    if (usuarios.length == 0) {
      res.status(409).send({ done: false, message: 'Usuario no Existe' });
    } else {
      const resultPassword = bcrypt.compareSync(req.body.password, usuarios[0].password)
      if (resultPassword) {
        const dataUser = {
          done: true,
          message: `Bienvenido ${usuarios[0].username}`,
          data : {
            id_usuarios: usuarios[0].id_usuarios,
            username: usuarios[0].username
          }
        }
        res.status(200).json(dataUser);
      } else {
        res.status(409).send({ done: false, message: 'Contraseña o Usuario Incorrecto' });
      }
    }
  } catch (err) {
    if (!err.statusCode) {
      res.status(500).send({ done: false, message: 'Error' });
    }
    next(err);
  }
};

exports.postUsuarios = async (req, res, next) => {
  try {
    const [usuario] = await Usuarios.getUser(req.body.username);
    if (usuario.length > 0) {
      res.status(409).json({ done: false, message: "Usuario ya Existe"});
    } else {
      const postResponse = await Usuarios.post(req.body.username, bcrypt.hashSync(req.body.password));
      res.status(201).json(postResponse);
    }
  } catch (err) {
    if (!err.statusCode) {
      res.status(500).send({ done: false, message: 'Error' });
    }
    next(err);
  }
};

exports.putUsuarios = async (req, res, next) => {
  try {
    const [usuario] = await Usuarios.getUser(req.body.username);
    if (usuario.length > 0) {
      res.status(500).json({ done: false, message: "Nombre de Usuario ya Existe"});
    } else {
      const putResponse = await Usuarios.update(req.body.id_usuarios, req.body.username, bcrypt.hashSync(req.body.password));
      res.status(200).json(putResponse);
    }
  } catch (err) {
    if (!err.statusCode) {
      res.status(500).send({ done: false, message: 'Error' });
    }
    next(err);
  }
};

exports.deleteUsuarios = async (req, res, next) => {
  try {
    const deleteResponse = await Usuarios.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      res.status(500).send({ done: false, message: 'Error' });
    }
    next(err);
  }
};
