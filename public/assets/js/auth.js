const API_URL = "http://localhost:3000/api";

// REGISTRO
document.getElementById("btn-register").addEventListener("click", async (e) => {
  e.preventDefault();

  const nombre_completo = document.getElementById("nombre").value;
  const email = document.getElementById("correo").value;
  const contraseña = document.getElementById("contraseña").value;

  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre_completo, correo, contraseña }),
  });

  const data = await res.json();
  alert(data.message);
});

// LOGIN
document.getElementById("btn-login").addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const contraseña = document.getElementById("contraseña").value;

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contraseña }),
  });

  const data = await res.json();

  if (res.ok) {
    // Guardar en localStorage para usar en el perfil
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "perfil.html"; // redirige al perfil
  } else {
    alert(data.message);
  }
});
