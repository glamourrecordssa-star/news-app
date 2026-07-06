const todayDate = document.getElementById("todayDate");
const tickerTrack = document.getElementById("tickerTrack");
const heroCategory = document.getElementById("heroCategory");
const heroHeadline = document.getElementById("heroHeadline");
const heroSummary = document.getElementById("heroSummary");
const heroMeta = document.getElementById("heroMeta");
const latestList = document.getElementById("latestList");
const pulseGrid = document.getElementById("pulseGrid");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

const breakingNewsItems = [
  "South Africa's festival circuit expands with new township creative hubs",
  "Rising film collectives push for better distribution for local stories",
  "Fashion houses and stylists turn to digital lookbooks for faster bookings",
];

const heroSlides = [
  {
    category: "Industry News",
    title: "South Africa's festival circuit expands with new township creative hubs",
    summary:
      "Promoters and municipalities are teaming up to convert community spaces into year-round culture and performance venues.",
    date: "Monday, 6 July 2026",
    author: "Maya Dlamini",
    readTime: "6 min read",
  },
  {
    category: "Film",
    title: "Rising film collectives push for better distribution for local stories",
    summary:
      "Independent producers want streaming deals that keep more value inside South Africa and the continent.",
    date: "Monday, 6 July 2026",
    author: "Sibusiso Ndlovu",
    readTime: "8 min read",
  },
  {
    category: "Fashion",
    title: "Fashion houses and stylists turn to digital lookbooks for faster bookings",
    summary:
      "Creative businesses are using verified profiles, galleries, and pricing to convert interest into work.",
    date: "Monday, 6 July 2026",
    author: "Aisha Khan",
    readTime: "5 min read",
  },
];

const latestNews = [
  {
    index: 1,
    category: "Film",
    read: "8 min read",
    title: "Rising film collectives push for better distribution for local stories",
  },
  {
    index: 2,
    category: "Fashion",
    read: "5 min read",
    title: "Fashion houses and stylists turn to digital lookbooks for faster bookings",
  },
  {
    index: 3,
    category: "Artists",
    read: "Profile feature",
    title: "Zuri Nova spotlight",
  },
  {
    index: 4,
    category: "Artists",
    read: "Audience pulse",
    title: "Mandla Tone spotlight",
  },
];

const pulseStories = [
  {
    category: "Industry News",
    title: "South Africa's festival circuit expands with new township creative hubs",
    summary:
      "Promoters and municipalities are teaming up to convert community spaces into year-round culture and performance venues.",
    date: "Monday, 6 July 2026",
    views: "128k",
    author: "Maya Dlamini",
    tag: "Trending",
  },
  {
    category: "Film",
    title: "Rising film collectives push for better distribution for local stories",
    summary:
      "Independent producers want streaming deals that keep more value inside South Africa and the continent.",
    date: "Monday, 6 July 2026",
    views: "94k",
    author: "Sibusiso Ndlovu",
    tag: "Trending",
  },
  {
    category: "Fashion",
    title: "Fashion houses and stylists turn to digital lookbooks for faster bookings",
    summary:
      "Creative businesses are using verified profiles, galleries, and pricing to convert interest into work.",
    date: "Monday, 6 July 2026",
    views: "76k",
    author: "Aisha Khan",
    tag: "Update",
  },
];

let currentSlideIndex = 0;
let sliderTimer = null;

function setTodayDate() {
  if (!todayDate) {
    return;
  }

  const formattedDate = new Intl.DateTimeFormat("en-ZA", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  todayDate.textContent = formattedDate;
}

function renderTicker() {
  if (!tickerTrack) {
    return;
  }

  const repeated = [...breakingNewsItems, ...breakingNewsItems];
  tickerTrack.innerHTML = repeated
    .map((item) => `<span class="ticker-item">• ${item}</span>`)
    .join("");
}

function renderHeroSlide(index) {
  const slide = heroSlides[index];
  if (!slide || !heroHeadline || !heroSummary || !heroMeta || !heroCategory) {
    return;
  }

  heroCategory.textContent = slide.category;
  heroHeadline.textContent = slide.title;
  heroSummary.textContent = slide.summary;
  heroMeta.innerHTML = `
    <span>${slide.date}</span>
    <span>By ${slide.author}</span>
    <span>${slide.readTime}</span>
  `;
}

function changeSlide(step) {
  currentSlideIndex = (currentSlideIndex + step + heroSlides.length) % heroSlides.length;
  renderHeroSlide(currentSlideIndex);
}

function startSlider() {
  if (sliderTimer) {
    clearInterval(sliderTimer);
  }

  sliderTimer = setInterval(() => {
    changeSlide(1);
  }, 6500);
}

function renderLatestNews() {
  if (!latestList) {
    return;
  }

  latestList.innerHTML = latestNews
    .map(
      (item) => `
      <article class="latest-item">
        <div class="latest-item-top">
          <span class="latest-index">${item.index}</span>
          <p>${item.category} • ${item.read}</p>
        </div>
        <h3>${item.title}</h3>
      </article>
    `,
    )
    .join("");
}

function renderPulseStories() {
  if (!pulseGrid) {
    return;
  }

  pulseGrid.innerHTML = pulseStories
    .map(
      (story) => `
      <article class="pulse-card">
        <p class="section-tag">${story.category}</p>
        <h3>${story.title}</h3>
        <p class="pulse-summary">${story.summary}</p>
        <div class="pulse-meta-row">
          <span>${story.date}</span>
          <span>${story.views}</span>
          <span>By ${story.author}</span>
        </div>
        <div class="pulse-footer-row">
          <span class="pill">${story.tag}</span>
          <a href="#">Read more</a>
        </div>
      </article>
    `,
    )
    .join("");
}

if (prevSlide && nextSlide) {
  prevSlide.addEventListener("click", () => {
    changeSlide(-1);
    startSlider();
  });

  nextSlide.addEventListener("click", () => {
    changeSlide(1);
    startSlider();
  });
}

setTodayDate();
renderTicker();
renderHeroSlide(currentSlideIndex);
renderLatestNews();
renderPulseStories();
startSlider();
