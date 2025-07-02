document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-register');

  if (!form) {
    console.error('No se encontró el formulario');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre_completo = document.getElementById('nombre_completo').value;
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    if (!nombre_completo || !correo || !password) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nombre_completo,
          correo, 
          password
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert('¡Registro exitoso!');
        form.reset();
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error en el registro');
    }
  });
});
