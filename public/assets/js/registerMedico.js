document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-register-medico");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener los valores de los campos
    const nombre = document.getElementById("nombre-medico")?.value.trim();
    const correo = document.getElementById("correo-registro-medico")?.value.trim();
    const password = document.getElementById("password-registro-medico")?.value.trim();
    const especialidad = document.getElementById("especialidad-medico")?.value.trim();
    const mensaje = document.getElementById("mensaje-registro-medico");

    // Validar que todos estén completos
    if (!nombre || !correo || !password || !especialidad) {
      mensaje.textContent = "Todos los campos son obligatorios";
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/medicos/registro-medico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre_completo: nombre, correo, password, especialidad }),
      });

      const result = await response.json();

      if (response.ok) {
        mensaje.textContent = "¡Registro exitoso!";
        form.reset();
      } else {
        mensaje.textContent = result.message || "Error en el registro";
      }
    } catch (error) {
      console.error("Error:", error);
      mensaje.textContent = "No se pudo conectar al servidor";
    }
  });
});
