const API_URL = "http://localhost:3000/api";

async function registerUser() {
  const nombre_completo = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre_completo, email, password })
  });

  const data = await res.json();
  alert(data.message);
}

async function loginUser() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Inicio de sesión exitoso");
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "inicio-FoMedi.html";
  } else {
    alert(data.message);
  }
}
