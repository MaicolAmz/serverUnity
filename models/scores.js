const db = require('../util/database');

module.exports = class Scores {
  constructor(id_puntajes, id_usuarios, puntaje) {
    this.id_puntajes = id_puntajes;
    this.id_usuarios = id_usuarios;
    this.puntaje = puntaje;
  }

  static fetchAll() {
    return db.execute(
      `SELECT usuarios.id_usuarios, usuarios.username, puntajes.puntaje
      FROM usuarios
      INNER JOIN puntajes ON usuarios.id_usuarios = puntajes.id_usuarios`
    );
  }

  static getPuntaje(id_usuarios) {
    return db.execute(
        `SELECT * FROM puntajes WHERE id_usuarios = '${id_usuarios}'`
        )
  }

  static post(id_usuarios, puntaje) {
    db.execute(
      `INSERT INTO puntajes (id_usuarios, puntaje) VALUES ('${id_usuarios}', '${puntaje}')`
    );
    return { done: true, message: "Ingresado con exito" }
  }

  static update(id_puntajes, id_usuarios, puntaje) {
    db.execute(
      'UPDATE puntajes SET id_usuarios = ?, puntaje = ? WHERE id_puntajes = ?', [id_usuarios, puntaje, id_puntajes]
    );
    return { done: true, message: "Actualizado con Éxito" }
  }

  static delete(id_puntajes) {
    db.execute(
      `DELETE FROM puntajes WHERE id_puntajes = ${id_puntajes}`,
    );
    db.execute(
      `DELETE FROM puntajes WHERE id_puntajes = ${id_puntajes}`,
    );

    return { done: true, message: "Eliminado con Exito" };
  }
};
