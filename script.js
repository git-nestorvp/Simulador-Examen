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
    // Agrega más preguntas aquí...
  ];
  
  // Mezcla y toma 45 preguntas
  const preguntasAleatorias = bancoPreguntas.sort(() => 0.5 - Math.random()).slice(0, 45);
  
  let indice = 0;
  let preguntaActual;
  
  const divPregunta = document.getElementById("pregunta");
  const divOpciones = document.getElementById("opciones");
  const divFeedback = document.getElementById("feedback");
  const btnSiguiente = document.getElementById("siguiente");
  const divContador = document.getElementById("contador");
  
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
      divPregunta.textContent = "Simulador completado.";
      divOpciones.innerHTML = "";
      divFeedback.textContent = "";
      btnSiguiente.style.display = "none";
      divContador.textContent = "";
    }
  };
  
  mostrarPregunta();
  