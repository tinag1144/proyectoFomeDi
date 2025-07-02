document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login-medico");

  if (!form) {
    console.error("Formulario de login de médico no encontrado.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo-medico").value;
    const password = document.getElementById("password-medico").value;
    const mensaje = document.getElementById("login-mensaje-medico");

    if (!correo || !password) {
      mensaje.innerText = "Todos los campos son obligatorios";
      mensaje.style.color = "red";
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/medicos/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, password }),
      });

      const data = await res.json();

     if (res.ok) {
  mensaje.innerText = "Inicio de sesión exitoso";
  mensaje.style.color = "green";

  // Guardar el nombre y/o ID del doctor en sessionStorage
  sessionStorage.setItem("doctorNombre", data.doctorNombre);
  sessionStorage.setItem("doctorId", data.doctorId);

  // Redireccionar al perfil
  window.location.href = "../public/perfilMedico.html";


      } else {
        mensaje.innerText = data.message || "Credenciales incorrectas";
        mensaje.style.color = "red";
      }
    } catch (error) {
      mensaje.innerText = "Error del servidor";
      mensaje.style.color = "red";
      console.error("Error:", error);
    }
  });
});
