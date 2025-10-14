import { FormularioAdministrativo } from "./useFormularioAdministrativo";

export const useValidacionAdministrativo = () => {
  const validar = (form: FormularioAdministrativo) => {
    const errores: Record<string, string> = {};

    if (!form.nombre.trim()) {
      errores.nombre = "El nombre es obligatorio";
    } else if (form.nombre.length < 2) {
      errores.nombre = "El nombre debe tener al menos 2 caracteres";
    }

    if (!form.email) {
      errores.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errores.email = "El email no es válido";
    }

    if (!form.password) {
      errores.password = "La contraseña es obligatoria";
    } else if (form.password.length < 8) {
      errores.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (!form.dni) {
      errores.dni = "El DNI es obligatorio";
    } else if (!/^\d{7,8}$/.test(form.dni)) {
      errores.dni = "DNI no válido";
    }

    if (!form.fechaNacimiento) {
      errores.fechaNacimiento = "La fecha de nacimiento es obligatoria";
    } else {
      const fechaNacimiento = new Date(form.fechaNacimiento);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      
      if (isNaN(fechaNacimiento.getTime())) {
        errores.fechaNacimiento = "Fecha no válida";
      } else if (edad < 18) {
        errores.fechaNacimiento = "Debes ser mayor de 18 años";
      } else if (edad > 120) {
        errores.fechaNacimiento = "Fecha de nacimiento no válida";
      }
    }

    if (!form.telefono) {
      errores.telefono = "El teléfono es obligatorio";
    } else if (!/^\d{10,15}$/.test(form.telefono)) {
      errores.telefono = "Número de teléfono no válido";
    }

    if (!form.direccion.trim()) {
      errores.direccion = "La dirección es obligatoria";
    } else if (form.direccion.length < 5) {
      errores.direccion = "La dirección debe tener al menos 5 caracteres";
    }

    return errores;
  };

  return { validar };
};
