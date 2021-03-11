const Puntajes = require('../models/scores');
const Usuarios = require('../models/usuarios');

exports.getAllPuntajes = async (req, res, next) => {
  try {
    const [allPuntajes] = await Puntajes.fetchAll();
    if (allPuntajes.length > 0) {
      const allPuntaje = {
        done: true,
        message: "Puntajes Globales",
        data: allPuntajes
      }
      res.status(200).send(allPuntaje);
    } else {
      res.status(409).send({ done: false, message: 'Puntaje no Existe' });
    }
    } catch (err) {
      if (!err.statusCode) {
        res.status(500).send({ done: false, message: 'Error' });
      }
      next(err);
    }
  };

  exports.getPuntaje = async (req, res, next) => {
    try {
      const [puntaje] = await Puntajes.getPuntaje(req.params.id);
      if (puntaje.length > 0) {
        const dataPuntaje = {
          done: true,
          message: "Puntaje Traidos",
          data: [{
            id_puntajes: puntaje[0].id_puntajes,
            id_usuarios: puntaje[0].id_usuarios,
            puntaje: puntaje[0].puntaje
          }]
        }
        res.status(200).send(dataPuntaje);
      } else {
        res.status(409).send({ done: false, message: 'Puntaje no Existe' });
      }
    } catch (err) {
      if (!err.statusCode) {
        res.status(500).send({ done: false, message: 'Error' });
      }
      next(err);
    }
  };

  exports.postPuntajes = async (req, res, next) => {
    try {
      const [usuarios] = await Usuarios.getToId(req.body.id_usuarios);
      if (usuarios.length == 0) {
        res.status(409).send({ done: false, message: 'Usuario no Existe' });
      } else {
        const [resPuntaje] = await Puntajes.getPuntaje(req.body.id_usuarios);
        if (resPuntaje.length > 0) {
          const putResponse = await Puntajes.update(
            resPuntaje[0].id_puntajes, req.body.id_usuarios, req.body.puntaje
          );
          res.status(200).json(putResponse);
        } else {
          const postResponse = await Puntajes.post(req.body.id_usuarios, req.body.puntaje);
          console.log(postResponse);
          res.status(201).json(postResponse);
        }
      }
    } catch (err) {
      if (!err.statusCode) {
        res.status(500).send({ done: false, message: 'Error' });
      }
      next(err);
    }
  };

  exports.deletePuntajes = async (req, res, next) => {
    try {
      const deleteResponse = await Puntajes.delete(req.params.id);
      res.status(200).send(deleteResponse);
    } catch (err) {
      if (!err.statusCode) {
        res.status(500).send({ done: false, message: 'Error' });
      }
      next(err);
    }
  };
