const tickerTrack = document.getElementById("tickerTrack");
const todayDate = document.getElementById("todayDate");
const heroImage = document.getElementById("heroImage");
const heroTitle = document.getElementById("heroTitle");
const heroMeta = document.getElementById("heroMeta");
const heroLink = document.getElementById("heroLink");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const highlightList = document.getElementById("highlightList");

const newsSection = document.getElementById("newsSection");
const artsSection = document.getElementById("artsSection");
const businessSection = document.getElementById("businessSection");
const sportsSection = document.getElementById("sportsSection");
const sidebarNewsSection = document.getElementById("sidebarNewsSection");

const latestItems = [
  "World AIDS Day 2025: Uniting for Health, Hope, and Humanity",
  "Izwi Lamagugu Anthology: A Triumph for Mpumalanga's Poetic Voices",
  "A Celebration of Heritage: Kabokweni Hosts Cultural Dance Program",
  "Indigenous Voices Shine at Izwi Lamagugu Workshop in Nkomazi",
  "Enos Sambo: Umsunguli weMpumalanga Poetry Festival",
];

const featuredSlides = [
  {
    title: "World AIDS Day 2025: Uniting for Health, Hope, and Humanity",
    date: "December 1, 2025",
    author: "Admin",
    image:
      "https://mplocaltime.co.za/wp-content/uploads/2025/12/e76f4296-a061-4470-9b1e-3deffe0f3aad-800x445.png",
    url: "#",
  },
  {
    title: "Izwi Lamagugu Anthology: A Triumph for Mpumalanga's Poetic Voices",
    date: "November 24, 2025",
    author: "Admin",
    image:
      "https://mplocaltime.co.za/wp-content/uploads/2025/11/Picsart_25-11-24_16-00-36-771-1-800x445.jpg",
    url: "#",
  },
  {
    title: "A Celebration of Heritage: Kabokweni Hosts Cultural Dance Program",
    date: "September 22, 2025",
    author: "Admin",
    image:
      "https://mplocaltime.co.za/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-26-at-17.44.43-1-800x445.jpeg",
    url: "#",
  },
];

const categoryData = {
  news: {
    title: "News",
    color: "#bfd6af",
    featured: {
      title: "World AIDS Day 2025: Uniting for Health, Hope, and Humanity",
      date: "December 1, 2025",
      summary:
        "Every year on December 1, the world comes together to observe World AIDS Day and renew support for people living with HIV.",
      image:
        "https://mplocaltime.co.za/wp-content/uploads/2025/12/e76f4296-a061-4470-9b1e-3deffe0f3aad-390x205.png",
    },
    items: [
      { title: "Izwi Lamagugu Anthology: A Triumph for Mpumalanga's Poetic Voices", date: "November 24, 2025" },
      { title: "Lindokuhle Mthimunye: Mpumalanga's Rising Star", date: "October 17, 2024" },
      { title: "Triumphant Victory and New Home: Ehlanzeni United FC", date: "October 26, 2023" },
      { title: "Empowering Lives in Egogogweni", date: "October 4, 2023" },
    ],
  },
  arts: {
    title: "Arts",
    color: "#0c8a10",
    featured: {
      title: "Izwi Lamagugu Anthology: A Triumph for Mpumalanga's Poetic Voices",
      date: "November 24, 2025",
      summary:
        "The IZWI LAMAGUGU anthology gives poets from across Mpumalanga space to share indigenous language voices.",
      image:
        "https://mplocaltime.co.za/wp-content/uploads/2025/11/Picsart_25-11-24_16-00-36-771-1-390x205.jpg",
    },
    items: [
      { title: "Kabokweni Hosts Cultural and Indigenous Dance Program", date: "September 22, 2025" },
      { title: "Indigenous Voices Shine in Nkomazi", date: "April 29, 2025" },
      { title: "Enos Sambo: Umsunguli weMpumalanga Poetry Festival", date: "December 12, 2024" },
      { title: "Celebrating Art and Culture with Mqhawe Group", date: "December 5, 2023" },
    ],
  },
  business: {
    title: "Business",
    color: "#6ac4c2",
    featured: {
      title: "Indigenous Voices Shine at Izwi Lamagugu Workshop in Nkomazi",
      date: "April 29, 2025",
      summary:
        "Creative and cultural industries continue to grow local business opportunities in Nkomazi and nearby towns.",
      image:
        "https://mplocaltime.co.za/wp-content/uploads/2025/04/e1222287-d4f6-40de-9cc4-fb7393e3e455-390x205.jpg",
    },
    items: [
      { title: "FACIM 2023: Marketing Mpumalanga in Maputo", date: "September 19, 2023" },
      { title: "Thabile Ntiwane Lubisi: Property Ventures", date: "September 1, 2023" },
      { title: "Empowering the Streets with Freshness", date: "September 1, 2023" },
      { title: "Creative Entrepreneurs Build New Markets", date: "August 18, 2023" },
    ],
  },
  sports: {
    title: "Sports",
    color: "#dd5a5a",
    featured: {
      title: "Triumphant Victory and New Home: Ehlanzeni United FC",
      date: "October 26, 2023",
      summary:
        "Supporters celebrated a big win as Ehlanzeni United FC continued a strong season and welcomed a new home ground.",
      image:
        "https://mplocaltime.co.za/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-23-at-15.49.16-390x205.jpeg",
    },
    items: [
      { title: "Nkomazi Selati Cup Concludes with Langeloop Junior Pirates", date: "June 6, 2023" },
      { title: "Matsulu County Football Association Expands Grassroots", date: "March 6, 2023" },
      { title: "Youth Football Clinics Draw Record Attendance", date: "February 20, 2023" },
      { title: "Regional Coaches Forum Builds New Talent Pathways", date: "February 5, 2023" },
    ],
  },
};

function setDateText() {
  if (!todayDate) {
    return;
  }

  const formatted = new Intl.DateTimeFormat("en-ZA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  todayDate.textContent = formatted;
}

function renderTicker() {
  if (!tickerTrack) {
    return;
  }

  const repeated = [...latestItems, ...latestItems];
  tickerTrack.innerHTML = repeated
    .map((item) => `<span class="ticker-item">${item}</span>`)
    .join("");
}

let currentSlide = 0;
let sliderInterval;

function renderSlide(index) {
  const slide = featuredSlides[index];
  if (!slide || !heroImage || !heroTitle || !heroMeta || !heroLink) {
    return;
  }

  heroImage.src = slide.image;
  heroImage.alt = slide.title;
  heroTitle.textContent = slide.title;
  heroMeta.textContent = `${slide.date} | By ${slide.author}`;
  heroLink.href = slide.url;
}

function moveSlide(step) {
  currentSlide = (currentSlide + step + featuredSlides.length) % featuredSlides.length;
  renderSlide(currentSlide);
}

function startSlider() {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(() => {
    moveSlide(1);
  }, 7000);
}

function renderHighlights() {
  if (!highlightList) {
    return;
  }

  highlightList.innerHTML = featuredSlides
    .map(
      (item) => `
      <article class="highlight-item">
        <img src="${item.image}" alt="${item.title}" />
        <div>
          <h3>${item.title}</h3>
          <p>${item.date}</p>
        </div>
      </article>
    `,
    )
    .join("");
}

function renderCategorySection(container, data) {
  if (!container || !data) {
    return;
  }

  const smallItems = data.items
    .map(
      (item) => `
      <article class="small-story">
        <h4><a href="#">${item.title}</a></h4>
        <p>${item.date}</p>
      </article>
    `,
    )
    .join("");

  container.innerHTML = `
    <div class="section-title" style="--section-color: ${data.color}">
      <span>${data.title}</span>
    </div>
    <div class="section-body">
      <article class="lead-story">
        <a href="#"><img src="${data.featured.image}" alt="${data.featured.title}" /></a>
        <h3><a href="#">${data.featured.title}</a></h3>
        <p class="meta">${data.featured.date}</p>
        <p class="summary">${data.featured.summary}</p>
      </article>
      <div class="small-stories">${smallItems}</div>
    </div>
  `;
}

if (prevSlide && nextSlide) {
  prevSlide.addEventListener("click", () => {
    moveSlide(-1);
    startSlider();
  });

  nextSlide.addEventListener("click", () => {
    moveSlide(1);
    startSlider();
  });
}

setDateText();
renderTicker();
renderSlide(currentSlide);
renderHighlights();
renderCategorySection(newsSection, categoryData.news);
renderCategorySection(artsSection, categoryData.arts);
renderCategorySection(businessSection, categoryData.business);
renderCategorySection(sportsSection, categoryData.sports);
renderCategorySection(sidebarNewsSection, categoryData.news);
startSlider();
