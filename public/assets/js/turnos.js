const especialidades = document.querySelectorAll('.especialidad');
const doctorGroup = document.getElementById('doctor-group');
const doctorSelect = document.getElementById('doctor');
const turnoGroup = document.getElementById('turno-group');
const horarioSelect = document.getElementById('horario');
const form = document.getElementById('form-turno');
const mensaje = document.getElementById('mensaje-confirmacion');

const medicosPorEspecialidad = {
  clinica: ['Dra. Carla Torres', 'Dr. Juan Gutiérrez'],
  pediatria: ['Dra. Mariela Ruiz'],
  cardiologia: ['Dr. Luis Fernández'],
  dermatologia: ['Dra. Paola Menéndez', 'Dr. Hugo Pérez'],
  ginecologia: ['Dra. Sofía López'],
};

const turnosPorDoctor = {
  'Dra. Carla Torres': ['1 Julio - 10:00', '3 Julio - 13:30'],
  'Dr. Juan Gutiérrez': ['2 Julio - 09:30', '4 Julio - 11:00'],
  'Dra. Mariela Ruiz': ['5 Julio - 10:00'],
  'Dr. Luis Fernández': ['1 Julio - 15:00', '6 Julio - 10:30'],
  'Dra. Paola Menéndez': ['2 Julio - 11:00'],
  'Dr. Hugo Pérez': ['7 Julio - 09:00'],
  'Dra. Sofía López': ['3 Julio - 14:00', '8 Julio - 12:00'],
};

especialidades.forEach(btn => {
  btn.addEventListener('click', () => {
    especialidades.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    const especialidadSeleccionada = btn.dataset.especialidad;

    doctorSelect.innerHTML = `<option disabled selected>Seleccionar un médico</option>`;
    medicosPorEspecialidad[especialidadSeleccionada].forEach(medico => {
      const option = document.createElement('option');
      option.value = medico;
      option.textContent = medico;
      doctorSelect.appendChild(option);
    });
    doctorGroup.classList.remove('hidden');
    turnoGroup.classList.add('hidden');
    horarioSelect.innerHTML = `<option disabled selected>Seleccionar horario</option>`;
  });
});

doctorSelect.addEventListener('change', () => {
  const medico = doctorSelect.value;
  horarioSelect.innerHTML = `<option disabled selected>Seleccionar horario</option>`;
  turnosPorDoctor[medico].forEach(turno => {
    const option = document.createElement('option');
    option.value = turno;
    option.textContent = turno;
    horarioSelect.appendChild(option);
  });
  turnoGroup.classList.remove('hidden');
});

// Confirmación visual
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (doctorSelect.value && horarioSelect.value) {
    mensaje.classList.remove('hidden');
    form.reset();

    // Reiniciar visual
    doctorGroup.classList.add('hidden');
    turnoGroup.classList.add('hidden');
    especialidades.forEach(btn => btn.classList.remove('selected'));

    setTimeout(() => {
      mensaje.classList.add('hidden');
    }, 5000);
  } else {
    alert("Por favor, completá todos los campos antes de confirmar el turno.");
  }
});
