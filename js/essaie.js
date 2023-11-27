// recuperation des elements
const prevButton = document.querySelector(".carousel_btn--left");
const nextButton = document.querySelector(".carousel_btn--right");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);

// getBoundingClientRect(): recupere les dimensions d'un element
// dans notre cas on initialise le premier element du track

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

// les fonctions
const moveToTargetImage = (track, currentImg, targetImg) => {
  track.style.transform = `translate(-${targetImg.style.left})`;
  currentImg.classList.remove("img-current-slide");
  targetImg.classList.add("img-current-slide");
};

const bougerLesPoints = (currentDot, targetDot) => {
  currentDot.classList.remove("nav_current-slide");
  targetDot.classList.add("nav_current-slide");
};

// cacher les boutons de navigations
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
    console.log(slides.length)
  } else {
    console.log(slides.length)

    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};
// ce qui doit se passer quand je cliquerai sur le button suivant

nextButton.addEventListener("click", () => {
  // il faut savoir le slide sur lequel tu te trouve
  const currentImg = track.querySelector(".img-current-slide");
  const nextImg = currentImg.nextElementSibling;

  //  je veux que quand je clique sur le bouton next le bouton actuel bouge vers le bouton suivant
  const currentDot = dotsNav.querySelector(".nav_current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextImg);

  hideShowArrows(slides, prevButton, nextButton, nextIndex);
  bougerLesPoints(currentDot, nextDot);

  moveToTargetImage(track, currentImg, nextImg);
});

// ce qui doit se passer quand je cliquerai sur le button precedent

prevButton.addEventListener("click", () => {
  const currentImg = track.querySelector(".img-current-slide");
  const prevImg = currentImg.previousElementSibling;
  //  je veux que quand je clique sur le bouton previous le bouton actuel bouge vers le bouton previous
  const currentDot = dotsNav.querySelector(".nav_current-slide");
  const prevDot = currentDot.previousElementSibling;

  const prevIndex = slides.findIndex((slide) => slide === prevImg);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
  bougerLesPoints(currentDot, prevDot);
  moveToTargetImage(track, currentImg, prevImg);
});

// quand je clique sur un point sur la nav bar que faire

dotsNav.addEventListener("click", (e) => {
  // what indicator was clicked on?
  const targetDot = e.target.closest("button");

  if (!targetDot) {
    return;
  } else {
    const currentDot = dotsNav.querySelector(".nav_current-slide");
    const targetDotIndex = dots.findIndex((dot) => dot === targetDot);
    const targetImg = slides[targetDotIndex];
    const currentImg = track.querySelector(".img-current-slide");

    hideShowArrows(slides, prevButton, nextButton, targetDotIndex);
    bougerLesPoints(currentDot, targetDot);
    moveToTargetImage(track, currentImg, targetImg);
  }
});
