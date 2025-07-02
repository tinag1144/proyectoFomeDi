document.addEventListener("DOMContentLoaded", () => {
  const API_BASE = "http://localhost:3000/api";
  const pacienteId = 1; // Cambiar dinámicamente si tenés login

  // Navegación entre secciones
  const links = document.querySelectorAll(".sidebar nav a");
  const sections = document.querySelectorAll(".section");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.section;

      sections.forEach(sec => sec.classList.remove("visible"));
      document.getElementById(target).classList.add("visible");

      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // DOM elements
  const inputDiagnostico = document.getElementById("input-diagnostico");
  const btnAgregarDiagnostico = document.getElementById("btn-agregar-diagnostico");

  const inputEstudio = document.getElementById("input-estudio");
  const btnAgregarEstudio = document.getElementById("btn-agregar-estudio");

  const inputMedicamento = document.getElementById("input-medicamento");
  const btnAgregarMedicamento = document.getElementById("btn-agregar-medicamento");

  const inputNota = document.getElementById("input-nota");
  const btnGuardarNota = document.getElementById("btn-guardar-nota");

  // FUNCIONES POST

  btnAgregarDiagnostico.addEventListener("click", async () => {
    const descripcion = inputDiagnostico.value.trim();
    if (!descripcion) return alert("Escribí un diagnóstico válido");

    try {
      const res = await fetch(`${API_BASE}/pacientes/${pacienteId}/diagnosticos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion }),
      });

      if (!res.ok) throw new Error("Error al agregar diagnóstico");

      inputDiagnostico.value = "";
      cargarDiagnosticos();
    } catch (error) {
      alert(error.message);
    }
  });

  btnAgregarEstudio.addEventListener("click", async () => {
    const nombre = inputEstudio.value.trim();
    if (!nombre) return alert("Escribí un estudio válido");

    const resultado = "Pendiente"; // Podés poner otro input después

    try {
      const res = await fetch(`${API_BASE}/pacientes/${pacienteId}/estudios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, resultado }),
      });

      if (!res.ok) throw new Error("Error al agregar estudio");

      inputEstudio.value = "";
      cargarEstudios();
    } catch (error) {
      alert(error.message);
    }
  });

  btnAgregarMedicamento.addEventListener("click", async () => {
    const nombre = inputMedicamento.value.trim();
    if (!nombre) return alert("Escribí un medicamento válido");

    const dosis = "10mg";
    const frecuencia = "1 vez al día";
    const duracion = "7 días";

    try {
      const res = await fetch(`${API_BASE}/pacientes/${pacienteId}/medicamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, dosis, frecuencia, duracion }),
      });

      if (!res.ok) throw new Error("Error al agregar medicamento");

      inputMedicamento.value = "";
      cargarMedicamentos();
    } catch (error) {
      alert(error.message);
    }
  });

  btnGuardarNota.addEventListener("click", async () => {
    const contenido = inputNota.value.trim();
    if (!contenido) return alert("Escribí una nota válida");

    try {
      const res = await fetch(`${API_BASE}/pacientes/${pacienteId}/notas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contenido }),
      });

      if (!res.ok) throw new Error("Error al guardar nota");

      inputNota.value = "";
      cargarNotas();
    } catch (error) {
      alert(error.message);
    }
  });

  // FUNCIONES GET
  async function cargarDiagnosticos() {
    try {
      const res = await fetch(`${API_BASE}/pacientes/${pacienteId}/diagnosticos`);
      const data = await res.json();
      console.log("📋 Diagnósticos:", data);
      // render logic acá si querés
    } catch (error) {
      console.error("Error al cargar diagnósticos:", error);
    }
  }

  async function cargarEstudios() {
    try {
      const res = await fetch(`${API_BASE}/pacientes/${pacienteId}/estudios`);
      const data = await res.json();
      console.log("📋 Estudios:", data);
    } catch (error) {
      console.error("Error al cargar estudios:", error);
    }
  }

  async function cargarMedicamentos() {
    try {
      const res = await fetch(`${API_BASE}/pacientes/${pacienteId}/medicamentos`);
      const data = await res.json();
      console.log("📋 Medicamentos:", data);
    } catch (error) {
      console.error("Error al cargar medicamentos:", error);
    }
  }

  async function cargarNotas() {
    try {
      const res = await fetch(`${API_BASE}/pacientes/${pacienteId}/notas`);
      const data = await res.json();
      console.log("📋 Notas:", data);
    } catch (error) {
      console.error("Error al cargar notas:", error);
    }
  }

  // Carga inicial
  cargarDiagnosticos();
  cargarEstudios();
  cargarMedicamentos();
  cargarNotas();
});
