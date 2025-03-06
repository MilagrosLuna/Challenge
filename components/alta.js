import { useState } from "react";

export default function FormularioAltaEmpleado() {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [dni, setDni] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [esDesarrollador, setEsDesarrollador] = useState(false);
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d+$/.test(dni)) {
      alert("El DNI solo puede contener numeros.");
      return;
    }
    if (dni.length < 7) {
      alert("El DNI debe tener al menos 7 caracteres.");
      return;
    }
    const anioNacimiento = new Date(fechaNacimiento).getFullYear();
    if (anioNacimiento < 1900 || anioNacimiento > new Date().getFullYear()) {
      alert("La fecha de nacimiento debe estar entre 1900 y el año actual.");
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

      if (res.ok) {
        alert("Empleado agregado con exito");
        setNombreCompleto("");
        setDni("");
        setFechaNacimiento("");
        setEsDesarrollador(false);
        setDescripcion("");
      } else {
        const errorData = await res.json();
        alert(
          `Error al agregar el empleado: ${
            errorData.error || "Error desconocido"
          }`
        );
      }
    } catch (err) {
      alert(
        "Hubo un error al intentar agregar el empleado."
      );
    }
  };

  return (
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
        />{" "}
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
  );
}
