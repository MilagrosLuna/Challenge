import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validarEmpleado } from "../lib/validaciones";

export default function FormularioAltaEmpleado() {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [dni, setDni] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [esDesarrollador, setEsDesarrollador] = useState(false);
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errores = validarEmpleado({
      nombre_completo: nombreCompleto,
      dni,
      fecha_nacimiento: fechaNacimiento,
      es_desarrollador: esDesarrollador,
    });

    if (errores.length > 0) {
      errores.forEach((error) => toast.error(error));
      return;
    }

    try {
      const res = await fetch("/api/empleados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_completo: nombreCompleto,
          dni,
          fecha_nacimiento: fechaNacimiento,
          es_desarrollador: esDesarrollador,
          descripcion,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(
          `Error al agregar: ${errorData.error || "Error desconocido"}`
        );
        return;
      }

      toast.success("Empleado agregado con éxito");

      setNombreCompleto("");
      setDni("");
      setFechaNacimiento("");
      setEsDesarrollador(false);
      setDescripcion("");
    } catch (err) {
      toast.error("Hubo un error al agregar el empleado.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />{" "}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded-lg shadow-md space-y-3"
      >
        <h2 className="text-xl font-bold">Alta de Empleado</h2>
        <input
          type="text"
          placeholder="Nombre Completo"
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={esDesarrollador}
            onChange={(e) => setEsDesarrollador(e.target.checked)}
            className="mr-2"
          />
          Es Desarrollador
        </label>
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Agregar
        </button>
      </form>
    </>
  );
}
