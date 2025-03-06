import pool from "@/lib/db";
/**
 * API handler para la gestión de empleados.
 *  GET - POST - PUT - DELETE
 */
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query("SELECT * FROM empleados");
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener los datos" });
    }
  } else if (req.method === "POST") {
    const {
      nombre_completo,
      dni,
      fecha_nacimiento,
      es_desarrollador,
      descripcion,
    } = req.body;

    if (
      !nombre_completo ||
      !dni ||
      dni.length < 7 ||
      !fecha_nacimiento ||
      new Date(fecha_nacimiento).getFullYear() < 1900 ||
      new Date(fecha_nacimiento).getFullYear() > new Date().getFullYear() ||
      typeof es_desarrollador !== "boolean"
    ) {
      return res.status(400).json({
        error: "Faltan campos obligatorios o tienen formato incorrecto",
      });
    }

    try {
      const query = `INSERT INTO empleados (nombre_completo, dni, fecha_nacimiento, es_desarrollador, descripcion) VALUES (?, ?, ?, ?, ?)`;
      const values = [
        nombre_completo,
        dni,
        fecha_nacimiento,
        es_desarrollador,
        descripcion,
      ];

      const [result] = await pool.query(query, values);
      res
        .status(201)
        .json({ mensaje: "Empleado creado exitosamente", id: result.insertId });
    } catch (err) {
      console.error("Error al crear el empleado:", err);
      res.status(500).json({ error: "Error al crear el empleado" });
    }
  } else if (req.method === "PUT") {
    const {
      id,
      nombre_completo,
      dni,
      fecha_nacimiento,
      es_desarrollador,
      descripcion,
    } = req.body;

    if (
      !id ||
      !nombre_completo ||
      !dni ||
      dni.length < 7 ||
      !fecha_nacimiento ||
      new Date(fecha_nacimiento).getFullYear() < 1900 ||
      new Date(fecha_nacimiento).getFullYear() > new Date().getFullYear() ||
      typeof es_desarrollador !== "boolean"
    ) {
      return res.status(400).json({
        error: "Faltan campos obligatorios o tienen formato incorrecto",
      });
    }

    try {
      const query = `UPDATE empleados SET nombre_completo = ?, dni = ?, fecha_nacimiento = ?, es_desarrollador = ?, descripcion = ? WHERE id = ?`;
      const values = [
        nombre_completo,
        dni,
        fecha_nacimiento,
        es_desarrollador,
        descripcion,
        id,
      ];

      await pool.query(query, values);
      res.status(200).json({ mensaje: "Empleado actualizado exitosamente" });
    } catch (err) {
      console.error("Error al actualizar el empleado:", err);
      res.status(500).json({ error: "Error al actualizar el empleado" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ error: "El ID del empleado es obligatorio" });
    }

    try {
      const query = "DELETE FROM empleados WHERE id = ?";
      const [result] = await pool.query(query, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Empleado no encontrado" });
      }

      res.status(200).json({ mensaje: "Empleado eliminado exitosamente" });
    } catch (err) {
      console.error("Error al eliminar el empleado:", err);
      res.status(500).json({ error: "Error al eliminar el empleado" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
