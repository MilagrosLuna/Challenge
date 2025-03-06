import { useState, useEffect } from "react";

export default function ListadoEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const res = await fetch("/api/empleados");
        if (!res.ok) throw new Error("Error al obtener empleados");
        const data = await res.json();
        setEmpleados(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmpleados();
  }, []);

  const eliminarEmpleado = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este empleado? Esta acción no se puede deshacer."
    );

    if (!confirmacion) {
      return;
    }

    const res = await fetch("/api/empleados", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      alert("Empleado eliminado con éxito");
      setEmpleados(empleados.filter((empleado) => empleado.id !== id));
    } else {
      alert("Error al eliminar el empleado");
    }
  };

  const actualizarEmpleado = async (empleadoActualizado) => {
    const empleadoOriginal = empleados.find(
      (emp) => emp.id === empleadoActualizado.id
    );

    const normalizarFecha = (fecha) => fecha.slice(0, 10);

    if (
      JSON.stringify({
        ...empleadoOriginal,
        fecha_nacimiento: normalizarFecha(empleadoOriginal.fecha_nacimiento),
      }) ===
      JSON.stringify({
        ...empleadoActualizado,
        fecha_nacimiento: normalizarFecha(empleadoActualizado.fecha_nacimiento),
      })
    ) {
      alert("No has realizado cambios.");
      setEmpleadoSeleccionado(null);
      return;
    }

    const res = await fetch("/api/empleados", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empleadoActualizado),
    });

    if (res.ok) {
      alert("Empleado actualizado con éxito");
      setEmpleados((prev) =>
        prev.map((emp) =>
          emp.id === empleadoActualizado.id ? empleadoActualizado : emp
        )
      );
      setEmpleadoSeleccionado(null);
    } else {
      alert("Error al actualizar el empleado");
    }
  };

  const formatearFecha = (fecha) => {
    return fecha.slice(0, 10);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-3">
      <h2 className="text-xl font-bold mb-4">Listado de Empleados</h2>
      {loading ? (
        <p className="text-gray-600">Cargando empleados...</p>
      ) : empleados.length === 0 ? (
        <p className="text-gray-600">No hay empleados registrados.</p>
      ) : (
        <ul className="space-y-2">
          {empleados.map((empleado) => (
            <div key={empleado.id}>
              <li className="p-3 bg-gray-100 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    {empleado.nombre_completo} - {empleado.dni}
                  </p>
                  <p className="text-gray-600">
                    {formatearFecha(empleado.fecha_nacimiento)} -{" "}
                    {empleado.es_desarrollador
                      ? "Desarrollador"
                      : "No Desarrollador"}
                  </p>

                  <p className="text-gray-500">{empleado.descripcion}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      if (empleadoSeleccionado?.id === empleado.id) {
                        setEmpleadoSeleccionado(null);
                      } else {
                        setEmpleadoSeleccionado({
                          ...empleado,
                          fecha_nacimiento: empleado.fecha_nacimiento.slice(
                            0,
                            10
                          ),
                        });
                      }
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarEmpleado(empleado.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
              {empleadoSeleccionado?.id === empleado.id && (
                <li className="p-3 bg-gray-300 rounded-lg shadow mt-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      actualizarEmpleado(empleadoSeleccionado);
                    }}
                    className="space-y-3"
                  >
                    <h3 className="text-lg font-bold">Editar Empleado</h3>
                    <input
                      type="text"
                      value={empleadoSeleccionado.nombre_completo}
                      onChange={(e) =>
                        setEmpleadoSeleccionado((prev) => ({
                          ...prev,
                          nombre_completo: e.target.value,
                        }))
                      }
                      required
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={empleadoSeleccionado.dni}
                      onChange={(e) =>
                        setEmpleadoSeleccionado((prev) => ({
                          ...prev,
                          dni: e.target.value,
                        }))
                      }
                      required
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="date"
                      value={empleadoSeleccionado.fecha_nacimiento}
                      onChange={(e) =>
                        setEmpleadoSeleccionado((prev) => ({
                          ...prev,
                          fecha_nacimiento: e.target.value,
                        }))
                      }
                      required
                      className="w-full p-2 border rounded"
                    />
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={empleadoSeleccionado.es_desarrollador}
                        onChange={(e) =>
                          setEmpleadoSeleccionado((prev) => ({
                            ...prev,
                            es_desarrollador: e.target.checked,
                          }))
                        }
                        className="mr-2"
                      />
                      Es Desarrollador
                    </label>
                    <textarea
                      value={empleadoSeleccionado.descripcion}
                      onChange={(e) =>
                        setEmpleadoSeleccionado((prev) => ({
                          ...prev,
                          descripcion: e.target.value,
                        }))
                      }
                      className="w-full p-2 border rounded"
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Guardar
                    </button>
                  </form>
                </li>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
