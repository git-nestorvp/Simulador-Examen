const bancoPreguntas = [
  {
    "pregunta": "Se un Oss ha accidentalmente rovesciato una brocca d'acqua nel corridoio dell'unità operativa, per ridurre il rischio di cadute, qual è il primo intervento che si dovrebbe attuare?",
    "opciones": [
      "Restare dov'è avvenuto l'incidente e mandare qualcun altro a chiamare il personale delle pulizie per fare asciugare",
      "Andare a prendere degli asciugamani o qualcos'altro per asciugare",
      "Riempire di nuovo la brocca d'acqua e portarla al paziente, quindi tornare ad asciugare",
      "Chiamare il personale delle pulizie dalla postazione più vicina per asciugare"
    ],
    "correcta": 0
  },
  {
    pregunta: "RIVELAZIONE DEL POLSO - Prima di procedere, è opportuno invitare la persona ad assumere la posizione supina e a posizionare l'avambraccio sul torace o lungo il fianco con il polso:",
    opciones: [
      "esteso e il palmo verso il basso",
      "e la mano nella posizione preferita dall'assistito",
      "esteso e il palmo verso l'alto",
      "flesso e la mano chiusa"
    ],
    correcta: 0
  },
    {
      pregunta: "Qual è il primo parametro da rilevare, in caso di dispnea?",
      opciones: [
        "La difficoltà respiratoria",
        "L'utilizzo dei muscoli accessori",
        "La difficoltà ad effettuare attività",
        "Il colorito cutaneo e la presenza di cianosi o pallore"
      ],
      correcta: 0
    },
    {
      pregunta: "I compiti forniti dall'infermiere devono essere eseguiti sempre e comunque dall'OSS?",
      opciones: [
        "Solo se rientrano nelle mansioni previste dal profilo OSS",
        "Solo se espressi in maniera scritta nel registro delle consegne",
        "Sì, sempre e comunque",
        "Sì, se espressi in maniera chiara"
      ],
      correcta: 0
    },
    {
      pregunta: "Nell'aiuto al paziente durante la vestizione, che cosa deve fare l'OSS?",
      opciones: [
        "L'OSS deve rispettare i tempi della persona",
        "L'OSS deve assistere altri pazienti, disinteressandosi",
        "L'OSS deve essere veloce per evitare colpi di freddo",
        "L'OSS deve agire sempre molto lentamente"
      ],
      correcta: 0
    },
    {
      pregunta: "L'assunzione di alimenti, per un paziente portatore di sondino naso-gastrico può avvenire:",
      opciones: [
        "sia con il sondino, sia per os",
        "solo tramite sondino",
        "solo per os",
        "solo con semi-solidi"
      ],
      correcta: 0
    },
    {
      pregunta: "Cos'è necessario per evitare che l'anziano posizionato su un seggiolone polifunzionale scivoli in avanti con il sedere?",
      opciones: [
        "L'Oss bascula la carrozzina evitando di inclinare lo schienale oltre i novanta gradi",
        "L'Oss posiziona una cintura addominale",
        "L'Oss bascula la carrozzina e inclina lo schienale più che può",
        "L'Oss inclina lo schienale della carrozzina"
      ],
      correcta: 0
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

// Botón para reiniciar examen
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

  // Mezclar opciones y mantener cuál es la correcta
  const opcionesOriginales = [...preguntaActual.opciones];
  const indiceCorrectoOriginal = preguntaActual.correcta;

  const opcionesMezcladas = opcionesOriginales
    .map((opcion, i) => ({ texto: opcion, esCorrecta: i === indiceCorrectoOriginal }))
    .sort(() => 0.5 - Math.random());

  opcionesMezcladas.forEach((opcionObj) => {
    const btn = document.createElement("button");
    btn.textContent = opcionObj.texto;
    btn.onclick = () => evaluarRespuesta(btn, opcionObj.esCorrecta);
    divOpciones.appendChild(btn);
  });
}

function evaluarRespuesta(btn, esCorrecta) {
  const botones = divOpciones.querySelectorAll("button");
  botones.forEach(b => b.disabled = true);

  if (esCorrecta) {
    respuestasCorrectas++;
    btn.classList.add("correcta");
    divFeedback.textContent = "¡Correcto!";
    divFeedback.style.color = "green";
  } else {
    btn.classList.add("incorrecta");
    divFeedback.textContent = "Incorrecto.";
    divFeedback.style.color = "red";

    // Resaltar la respuesta correcta
    botones.forEach(b => {
      if (b.textContent === preguntaActual.opciones[preguntaActual.correcta]) {
        b.classList.add("correcta");
      }
    });
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
