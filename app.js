const heroTrack = document.getElementById("heroTrack");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const dots = Array.from(document.querySelectorAll(".hero-dot"));
const breakingTicker = document.getElementById("breakingTicker");

let currentSlide = 0;
const totalSlides = 3;
let slideTimer = null;

function renderSlide() {
  if (!heroTrack) {
    return;
  }

  heroTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("w-8", "bg-primary");
      dot.classList.remove("w-2", "bg-white/60");
    } else {
      dot.classList.remove("w-8", "bg-primary");
      dot.classList.add("w-2", "bg-white/60");
    }
  });
}

function goToSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  renderSlide();
}

function startAutoSlide() {
  stopAutoSlide();
  slideTimer = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5500);
}

function stopAutoSlide() {
  if (slideTimer) {
    clearInterval(slideTimer);
    slideTimer = null;
  }
}

if (prevSlide) {
  prevSlide.addEventListener("click", () => {
    goToSlide(currentSlide - 1);
    startAutoSlide();
  });
}

if (nextSlide) {
  nextSlide.addEventListener("click", () => {
    goToSlide(currentSlide + 1);
    startAutoSlide();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
    startAutoSlide();
  });
});

if (breakingTicker) {
  breakingTicker.innerHTML += breakingTicker.innerHTML;
}

renderSlide();
startAutoSlide();
