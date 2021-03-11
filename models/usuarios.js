const db = require('../util/database');

module.exports = class Usuarios {
  constructor(id_usuarios, username, password) {
    this.id_usuarios = id_usuarios;
    this.username = username;
    this.password = password;
  }

  static fetchAll() {
    return db.execute(
      'SELECT * FROM usuarios'
    );
  }

  static getUser(username) {
    return db.execute(
        `SELECT * FROM usuarios WHERE username = '${username}'`
        )
  }

  static getToId(id_usuarios) {
    return db.execute(
        `SELECT * FROM usuarios WHERE id_usuarios = '${id_usuarios}'`
        )
  }

  static loginUser(username, password) {
    return db.execute(
      `SELECT id_usuarios, username FROM usuarios WHERE username = '${username}' AND password = '${password}'`
    );
  }

  static post(username, password) {
    db.execute(
      `INSERT INTO usuarios (username, password) VALUES ('${username}', '${password}')`
    );
    return { done: true, message: "Ingresado con exito" }
  }

  static update(id_usuarios, username, password) {
    db.execute(
      'UPDATE usuarios SET username = ?, password = ? WHERE id_usuarios = ?', [username, password, id_usuarios]
    );
    return { done: true, message: "Actualizado con Éxito" }
  }

  static delete(id_usuarios) {
    db.execute(
      `DELETE FROM puntajes WHERE id_usuarios = ${id_usuarios}`,
    );
    db.execute(
      `DELETE FROM usuarios WHERE id_usuarios = ${id_usuarios}`,
    );

    return { done: true, message: "Eliminado con Exito" };
  }
};
