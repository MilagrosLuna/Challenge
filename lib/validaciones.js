export function validarEmpleado(empleado, esActualizacion = false) {
  const errores = [];
  const { id, nombre_completo, dni, fecha_nacimiento, es_desarrollador } =
    empleado;

  if (esActualizacion && !id) {
    errores.push("El ID del empleado es obligatorio para actualizar.");
  }

  if (!nombre_completo || nombre_completo.trim().length < 3) {
    errores.push(
      "El nombre completo es obligatorio y debe tener al menos 3 caracteres."
    );
  } else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre_completo.trim())) {
    errores.push("El nombre solo puede contener letras y espacios.");
  }

  if (!dni || !/^\d+$/.test(dni)) {
    errores.push("El DNI es obligatorio y solo puede contener números.");
  } else if (dni.length < 7 || dni.length > 8) {
    errores.push("El DNI debe tener entre 7 y 8 caracteres.");
  }

  if (!fecha_nacimiento) {
    errores.push("La fecha de nacimiento es obligatoria.");
  } else {
    const anioNacimiento = new Date(fecha_nacimiento).getFullYear();
    const anioActual = new Date().getFullYear();
    if (anioNacimiento < 1910 || anioNacimiento > anioActual) {
      errores.push("La fecha debe estar entre 1910 y el año actual.");
    }
  }

  if (typeof es_desarrollador !== "boolean") {
    errores.push("El campo 'es_desarrollador' debe ser verdadero o falso.");
  }

  return errores;
}
