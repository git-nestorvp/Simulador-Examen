const bancoPreguntas = [
  {
    pregunta: "¿Cuál es la capital de Francia?",
    opciones: ["Madrid", "París", "Roma", "Berlín"],
    correcta: 1
  },
  {
    pregunta: "¿Qué es HTML?",
    opciones: ["Lenguaje de programación", "Lenguaje de marcado", "Framework", "Base de datos"],
    correcta: 1
  },
  {
    pregunta: "Se un OSS ha accidentalmente rovesciato una brocca d'acqua nel corridoio dell'unità operativa, per ridurre il rischio di cadute, qual è il primo intervento che si dovrebbe attuare?",
    opciones: [
      "Andare a prendere degli asciugamani o qualcos'altro per asciugare",
      "Restare dov'è avvenuto l'incidente e mandare qualcun altro a chiamare il personale delle pulizie per fare asciugare",
      "Riempire di nuovo la brocca d'acqua e portarla al paziente, quindi tornare ad asciugare",
      "Chiamare il personale delle pulizie dalla postazione più vicina per asciugare"
    ],
    correcta: 1
  }
  // Agrega más preguntas aquí...
];

let preguntasAleatorias = [];
let indice = 0;
let preguntaActual;
let respuestasCorrectas = 0;

const divPregunta = document.getElementById("pregunta");
const divOpciones = document.getElementById("opciones");
const divFeedback = document.getElementById("feedback");
const btnSiguiente = document.getElementById("siguiente");
const divContador = document.getElementById("contador");

// Creamos el botón de reinicio
const btnReiniciar = document.createElement("button");
btnReiniciar.textContent = "🔄 Volver a realizar examen";
btnReiniciar.style.display = "none";
btnReiniciar.onclick = reiniciarExamen;
document.body.appendChild(btnReiniciar);

function iniciarSimulador() {
  preguntasAleatorias = bancoPreguntas.sort(() => 0.5 - Math.random()).slice(0, 45);
  indice = 0;
  respuestasCorrectas = 0;
  btnSiguiente.style.display = "block";
  btnReiniciar.style.display = "none";
  mostrarPregunta();
}

function mostrarPregunta() {
  btnSiguiente.disabled = true;
  divFeedback.textContent = "";
  divOpciones.innerHTML = "";
  preguntaActual = preguntasAleatorias[indice];
  divPregunta.textContent = preguntaActual.pregunta;
  divContador.textContent = `Pregunta ${indice + 1} de ${preguntasAleatorias.length}`;

  preguntaActual.opciones.forEach((opcion, i) => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.onclick = () => evaluarRespuesta(btn, i);
    divOpciones.appendChild(btn);
  });
}

function evaluarRespuesta(btn, seleccionada) {
  const correcta = preguntaActual.correcta;
  const botones = divOpciones.querySelectorAll("button");
  botones.forEach((b, i) => {
    b.disabled = true;
    if (i === correcta) b.classList.add("correcta");
    if (i === seleccionada && i !== correcta) b.classList.add("incorrecta");
  });

  if (seleccionada === correcta) {
    respuestasCorrectas++;
    divFeedback.textContent = "¡Correcto!";
    divFeedback.style.color = "green";
  } else {
    divFeedback.textContent = "Incorrecto.";
    divFeedback.style.color = "red";
  }

  btnSiguiente.disabled = false;
}

btnSiguiente.onclick = () => {
  indice++;
  if (indice < preguntasAleatorias.length) {
    mostrarPregunta();
  } else {
    const total = preguntasAleatorias.length;
    const porcentaje = Math.round((respuestasCorrectas / total) * 100);
    const aprobado = porcentaje >= 75;

    divPregunta.textContent = "Simulador completado.";
    divOpciones.innerHTML = "";
    divFeedback.innerHTML = `
      <p>✔ Respuestas correctas: ${respuestasCorrectas} de ${total}</p>
      <p>📊 Porcentaje: ${porcentaje}%</p>
      <p style="font-weight:bold; color:${aprobado ? 'green' : 'red'};">
        ${aprobado ? '✅ PASSED' : '❌ FAILED'}
      </p>
    `;
    btnSiguiente.style.display = "none";
    btnReiniciar.style.display = "block";
    divContador.textContent = "";
  }
};

function reiniciarExamen() {
  iniciarSimulador();
}

iniciarSimulador();
