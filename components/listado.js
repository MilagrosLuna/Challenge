import { useState, useEffect } from "react";
import { validarEmpleado } from "../lib/validaciones";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmpleados();
  }, []);

  const eliminarEmpleado = async (id) => {
    toast.info(
      <div>
        <p>¿Seguro que quieres eliminar este empleado?</p>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={async () => {
              await confirmarEliminacion(id);
              toast.dismiss();
            }}
          >
            Sí, eliminar
          </button>
          <button
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={() => toast.dismiss()}
          >
            Cancelar
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  };

  const confirmarEliminacion = async (id) => {
    try {
      const res = await fetch("/api/empleados", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Error al eliminar el empleado");

      setEmpleados((prev) => prev.filter((empleado) => empleado.id !== id));
      toast.success("Empleado eliminado con éxito");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const actualizarEmpleado = async (empleadoActualizado) => {
    const empleadoOriginal = empleados.find(
      (emp) => emp.id === empleadoActualizado.id
    );

    const esIgual =
      JSON.stringify(empleadoOriginal) === JSON.stringify(empleadoActualizado);

    if (esIgual) {
      toast.warn("No se realizaron cambios en el empleado.");
      setEmpleadoSeleccionado(null);
      return;
    }

    const empleadoParaEnviar = {
      ...empleadoActualizado,
      es_desarrollador: Boolean(empleadoActualizado.es_desarrollador),
    };

    const errores = validarEmpleado(empleadoParaEnviar);

    if (errores.length > 0) {
      toast.error(errores.join("\n"));
      return;
    }

    try {
      const res = await fetch("/api/empleados", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empleadoParaEnviar),
      });

      if (!res.ok) throw new Error("Error al actualizar el empleado");

      setEmpleados((prev) =>
        prev.map((emp) =>
          emp.id === empleadoActualizado.id ? empleadoActualizado : emp
        )
      );
      setEmpleadoSeleccionado(null);
      toast.success("Empleado actualizado con éxito");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formatearFecha = (fecha) => fecha.slice(0, 10);

  return (
    <>
      <ToastContainer></ToastContainer>
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
                  <li className="p-3 bg-amber-50 rounded-lg  mt-2">
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
    </>
  );
}
