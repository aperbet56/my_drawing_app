// Récupération des différents éléments
const canvas = document.getElementById("canvas");
const body = document.querySelector("body");
const favColorInput = document.getElementById("favcolor");
let allColors = document.querySelectorAll(".clr");
const clearBtn = document.querySelector(".clear");
const saveBtn = document.querySelector(".save");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Création des variables
let theColor = "";
let lineW = 5;
let prevX = null;
let prevY = null;
let draw = false;

// style background-color du body
body.style.backgroundColor = "#ffffff";

// Ecoute de l'événement "input" sur l'input favcolor
favColorInput.addEventListener(
  "input",
  () => {
    theColor = favColorInput.value;
    body.style.backgroundColor = theColor;
  },
  false
);

// L'interface CanvasRenderingContext2D est utilisée pour dessiner des rectangles, du texte, des images et d'autres objets sur l'élément canvas. Il fournit le contexte de rendu 2D pour la surface de dessin d'un élément <canvas>.
//Pour obtenir un objet de cette interface, appelez getContext() sur un élément <canvas>, en fournissant "2d" comme argument
const ctx = canvas.getContext("2d");
ctx.lineWidth = lineW;

document.getElementById("ageInputId").oninput = () => {
  draw = null;
  lineW = document.getElementById("ageInputId").value;
  document.getElementById("ageOutputId").textContent = lineW;
  ctx.lineWidth = lineW;
};

allColors = Array.from(allColors);
allColors.forEach((color) => {
  // Ecoute de l'événement "click" sur la couleur
  color.addEventListener("click", () => {
    ctx.strokeStyle = color.dataset.clr;
  });
});

// Ecoute de l'événement "click" sur le bouton clear
clearBtn.addEventListener("click", () => {
  //La méthode CanvasRenderingContext2D.clearRect() de l'API 2D des Canvas met en noir transparent tous les pixels dans le rectangle défini par le point de départ de coordonnées (x, y) et par les tailles (largeur, hauteur), supprimant tout contenu précédemment dessiné.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Ecoute de l'événement "click" sur le bouton save
saveBtn.addEventListener("click", () => {
  let data = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  a.href = data;
  a.download = "sketch.png";
  a.click();
});

// Ecoute de l'événement mousemouve
window.addEventListener("mousemove", (e) => {
  if (prevX === null || prevY === null || !draw) {
    prevX = e.clientX;
    prevY = e.clientY;
    return;
  }

  let currentX = e.clientX;
  let currentY = e.clientY;

  //La méthode CanvasRenderingContext2D.beginPath() de l'API Canvas 2D permet de commencer un nouveau chemin en vidant la liste des sous-chemins. Appelez cette méthode quand vous voulez créer un nouveau chemin.
  ctx.beginPath();
  //La méthode CanvasRenderingContext2D.moveTo() de l'API Canvas 2D déplace le point de départ d'un nouveau sous-chemin vers les coordonnées (x, y).
  ctx.moveTo(prevX, prevY);
  // La méthode CanvasRenderingContext2D.lineTo() de l'API Canvas 2D connecte le dernier point du sous-chemin en cours aux coordonnées x, y spécifiées avec une ligne droite (sans tracer réellement le chemin
  ctx.lineTo(currentX, currentY);
  //La méthode CanvasRenderingContext2D.stroke() de l'API Canvas 2D dessine le chemin actuel ou donné avec le style de trait actuel utilisant la règle d'enroulement non nulle.
  ctx.stroke();

  prevX = currentX;
  prevY = currentY;
});
// Ecoute de l'événement mousedown (L'évènement mousedown est déclenché à partir d'un Element lorsqu'on appuie sur le bouton d'un dispositif de pointage (une souris par exemple) pendant que le curseur est sur l'élément.)
window.addEventListener("mousedown", (e) => (draw = true));

// Ecoute de l'événement mouseup (L'évènement mouseup est déclenché à partir d'un Element lorsqu'un bouton d'un dispositif de pointage (une souris ou un pavé tactile par exemple) est relâché lorsque le pointeur est sur cet élément.)
window.addEventListener("mouseup", (e) => (draw = false));
