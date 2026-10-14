// Dedicatoria extensa de cumpleaños
const lines = [
  "Hay días en el año que se sienten mágicos e incomparables…",
  "pero hoy es el día más especial y hermoso de todos porque es tu cumpleaños, mi adorada Antonela.",
  "Desde el preciso instante en que llegaste a mi vida, cada rincón de mi mundo cambió por completo.",
  "Hasta los días más grises o sencillos se convirtieron de repente en destellos llenos de una luz única.",
  "Como el Principito cuidaba con todo su amor, paciencia y devoción a su pequeña rosa en aquel asteroide,",
  "así quiero pasar el resto de mis días celebrándote, cuidándote y agradeciéndole al universo por tu hermosa existencia.",
  "Eres mi paz más sincera, mi sonrisa favorita en las mañanas y el regalo más maravilloso que la vida me pudo dar.",
  "Deseo de todo corazón que este nuevo año de vida te abra las puertas a tanta felicidad como la que tú regalas a todos.",
  "Si volviera a nacer, o si el destino me diera a elegir mil veces más en qué universo vivir...",
  "te volvería a buscar y a elegir a ti, sin pensarlo ni un solo segundo, porque eres mi persona favorita.",
  "Y para recordar un poquito de lo mucho que hemos construido juntos..."
];

// Lista de fotos individuales que pasan una por una
const memoryPhotos = [
  "SORIENTES.jpeg",
  "FOTO EN CARRO ABRAZADOS.jpeg",
  "FOTO CON BOTELLA CARRO.jpeg",
  "PARQUE DE LAS AGUAS CUADRO.jpeg",
  "pARQUE DE LA AGUAS SELFEI.jpeg",
  "pARQUE DE LAS AGUAS BESO.jpeg",
  "CON CAPUCHA.jpeg",
  "FOTO ABRAZDASOS.jpeg",
  "BRAZO RODEANDO CABEZA.jpeg",
  "BESO EN PUENTE.jpeg",
  "BESO EN EL CUELLO.jpeg",
  "ABRAZADOS.jpeg",
  "FOTO DE PIES.jpeg",
  "CHUTO.jpeg",
  "CHUTO ABRAZADOS.jpeg",
  "ATARDECER MANOS.jpeg",
  "MANO CORAZONES.jpeg"
];

// Frase profunda, romántica y melancólica tras la última foto individual
const finalSadRomanticLine = "A veces me da miedo lo rápido que pasa el tiempo… pero si el tiempo vuela, quiero que sea siempre a tu lado, guardando cada uno de estos recuerdos en el alma. ✨";
const finalSadRomanticLine ="Feliz cumpleaños, mi dadita hermosa. Te amo con absolutamente todo mi corazón. ❤️";
const msg = document.getElementById("message");
const memoryContainer = document.getElementById("memory-container");
const memoryImg = document.getElementById("memory-img");
const galleryGrid = document.getElementById("gallery-grid");
const sceneImg = document.getElementById("scene-img");

let idx = 0;
let photoIdx = 0;
let stageMode = "texts"; // "texts", "photos", "sadLine", "gallery"
let mainInterval = null;

function runExperience() {
  if (stageMode === "texts") {
    if (idx < lines.length) {
      msg.classList.remove("show");
      setTimeout(() => {
        msg.textContent = lines[idx];
        msg.classList.add("show");
        idx++;
      }, 500);
    } else {
      // Pasamos a mostrar fotos individuales
      msg.classList.remove("show");
      setTimeout(() => {
        stageMode = "photos";
        runExperience();
        clearInterval(mainInterval);
        mainInterval = setInterval(runExperience, 4500);
      }, 1000);
    }
  } 
  else if (stageMode === "photos") {
    if (photoIdx < memoryPhotos.length) {
      memoryContainer.classList.remove("show");
      setTimeout(() => {
        memoryImg.src = memoryPhotos[photoIdx];
        memoryContainer.classList.add("show");
        photoIdx++;
      }, 400);
    } else {
      // Tras la última foto individual, ocultamos la foto y mostramos la frase nostálgica/romántica
      memoryContainer.classList.remove("show");
      setTimeout(() => {
        stageMode = "sadLine";
        msg.textContent = finalSadRomanticLine;
        msg.classList.add("show");
        clearInterval(mainInterval);
        // Dejamos la frase triste/romántica durante 9 segundos para que se lea con calma
        mainInterval = setInterval(runExperience, 9000);
      }, 1000);
    }
  }
  else if (stageMode === "sadLine") {
    // Tras la frase nostálgica, la desvanecemos y mostramos el cuadro final de 4x4
    msg.classList.remove("show");
    setTimeout(() => {
      stageMode = "gallery";
      sceneImg.style.display = "none"; // Ocultamos la escena del principito
      galleryGrid.classList.add("show");
      clearInterval(mainInterval); // Detenemos los intervalos, queda la cuadrícula final
    }, 1200);
  }
}

// Elementos de música
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = "🔊";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "🔇";
  }
}

// Evento al dar clic en "Abrir mi regalo"
document.getElementById("start").addEventListener("click", () => {
  const intro = document.getElementById("intro");
  intro.classList.add("hide");
  
  setTimeout(() => {
    intro.style.display = "none";
  }, 1000);

  bgMusic.play().then(() => {
    musicToggle.textContent = "🔊";
  }).catch(error => {
    console.log("Error al reproducir audio:", error);
  });

  runExperience();
  mainInterval = setInterval(runExperience, 8500);
});

musicToggle.addEventListener("click", toggleMusic);

// Estrellas de fondo
const holder = document.getElementById("stars");

for (let i = 0; i < 48; i++) {
  const s = document.createElement("span");
  s.className = "star";
  s.textContent = Math.random() > 0.7 ? "✦" : "·";
  s.style.left = Math.random() * 100 + "%";
  s.style.top = Math.random() * 88 + "%";
  s.style.fontSize = (10 + Math.random() * 18) + "px";
  s.style.animationDelay = Math.random() * 4 + "s";
  holder.appendChild(s);
}