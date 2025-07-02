document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.getElementById('form-login');
  const mensaje = document.getElementById('login-mensaje');

  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const correo = document.getElementById('login-correo').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!correo || !password) {
      mensaje.textContent = 'Completá todos los campos';
      mensaje.style.color = 'red';
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      });

      const data = await res.json();

      if (res.ok) {
        mensaje.textContent = 'Inicio de sesión exitoso 🎉';
        mensaje.style.color = 'green';

        // Redirigir al perfil del paciente
        setTimeout(() => {
          window.location.href = '../public/mi-perfil.html';
        }, 1500);
      } else {
        mensaje.textContent = data.message || 'Error en el inicio de sesión';
        mensaje.style.color = 'red';
      }
    } catch (err) {
      console.error(err);
      mensaje.textContent = 'Error de conexión con el servidor';
      mensaje.style.color = 'red';
    }
  });
});
