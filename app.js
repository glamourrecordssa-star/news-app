const stories = [
  {
    id: 1,
    category: "Workshop",
    title: "Watercolor Basics for Beginners",
    date: "Jul 6, 2026",
    summary:
      "A guided evening session covering brush techniques, color blending, and composition at Central Arts Hub.",
  },
  {
    id: 2,
    category: "Exhibition",
    title: "Street Stories Photo Exhibition Opening",
    date: "Jul 6, 2026",
    summary:
      "Local photographers showcase documentary portraits highlighting neighborhood life and creative spaces.",
  },
  {
    id: 3,
    category: "Performance",
    title: "Open Mic Poetry Night at Riverside Stage",
    date: "Jul 5, 2026",
    summary:
      "Emerging spoken-word artists take the stage with live jazz backing and audience participation rounds.",
  },
  {
    id: 4,
    category: "Workshop",
    title: "Ceramics Studio: Wheel Throwing Intensive",
    date: "Jul 5, 2026",
    summary:
      "Hands-on clay workshop focused on forming, trimming, and glazing techniques for new and returning creators.",
  },
  {
    id: 5,
    category: "Dance",
    title: "Contemporary Movement Jam Session",
    date: "Jul 4, 2026",
    summary:
      "A relaxed movement lab led by guest choreographers with beginner and intermediate-friendly sequences.",
  },
  {
    id: 6,
    category: "Community",
    title: "Weekend Makers Market & Live Mural",
    date: "Jul 4, 2026",
    summary:
      "Craft vendors, live mural painting, and mini creative workshops for families and young artists.",
  },
  {
    id: 7,
    category: "Film",
    title: "Indie Film Screening: Midnight Frames",
    date: "Jul 3, 2026",
    summary:
      "An outdoor screening of short films by regional directors followed by a Q&A with the cast.",
  },
  {
    id: 8,
    category: "Music",
    title: "Sunset Jazz Trio at The Courtyard",
    date: "Jul 3, 2026",
    summary:
      "Live acoustic-jazz performance with local food vendors and a late-evening improvisation set.",
  },
];

const grid = document.getElementById("storiesGrid");
const leadStory = document.getElementById("leadStory");
const latestList = document.getElementById("latestList");
const searchInput = document.getElementById("searchInput");
const chipsWrap = document.getElementById("categoryChips");
const emptyState = document.getElementById("emptyState");
const todayDate = document.getElementById("todayDate");
const artistForm = document.getElementById("artistForm");
const artistPosts = document.getElementById("artistPosts");
const artistEmptyState = document.getElementById("artistEmptyState");
const formNote = document.getElementById("formNote");

const artistStorageKey = "artbeat_artist_posts";

const categories = ["All", ...new Set(stories.map((story) => story.category))];
let activeCategory = "All";
let searchText = "";
let artistDatabase = [];

function loadArtistDatabase() {
  try {
    const raw = localStorage.getItem(artistStorageKey);
    artistDatabase = raw ? JSON.parse(raw) : [];
  } catch {
    artistDatabase = [];
  }
}

function saveArtistDatabase() {
  localStorage.setItem(artistStorageKey, JSON.stringify(artistDatabase));
}

function formatEventDate(isoDate) {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function renderArtistDatabase() {
  if (!artistPosts || !artistEmptyState) {
    return;
  }

  artistPosts.innerHTML = "";

  artistDatabase
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach((entry) => {
      const card = document.createElement("article");
      card.className = "artist-post-card";

      card.innerHTML = `
        <h4>${entry.postTitle}</h4>
        <p class="artist-post-meta">${entry.postCategory} • ${formatEventDate(entry.eventDate)}</p>
        <p><strong>${entry.artistName}</strong> (${entry.artistType}) • ${entry.discipline} • ${entry.location}</p>
        <p>${entry.bio}</p>
        <p>${entry.postDetails}</p>
      `;

      artistPosts.appendChild(card);
    });

  artistEmptyState.classList.toggle("hidden", artistDatabase.length > 0);
}

function createChips() {
  chipsWrap.innerHTML = "";

  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `chip${category === activeCategory ? " active" : ""}`;
    btn.textContent = category;
    btn.addEventListener("click", () => {
      activeCategory = category;
      createChips();
      renderStories();
    });

    chipsWrap.appendChild(btn);
  });
}

function renderStories() {
  const query = searchText.trim().toLowerCase();

  const filtered = stories.filter((story) => {
    const categoryMatch = activeCategory === "All" || story.category === activeCategory;
    const searchMatch =
      query.length === 0 ||
      story.title.toLowerCase().includes(query) ||
      story.summary.toLowerCase().includes(query);

    return categoryMatch && searchMatch;
  });

  grid.innerHTML = "";
  leadStory.innerHTML = "";
  latestList.innerHTML = "";

  if (filtered.length > 0) {
    const lead = filtered[0];
    leadStory.innerHTML = `
      <p class="lead-meta">Featured Activity • ${lead.category} • ${lead.date}</p>
      <h2>${lead.title}</h2>
      <p>${lead.summary}</p>
    `;
  }

  filtered.slice(1).forEach((story, idx) => {
    const card = document.createElement("article");
    card.className = "story-card";
    card.style.animationDelay = `${idx * 60}ms`;

    card.innerHTML = `
      <div class="story-meta">
        <span class="story-category">${story.category}</span>
        <span>${story.date}</span>
      </div>
      <h2 class="story-title">${story.title}</h2>
      <p class="story-summary">${story.summary}</p>
    `;

    grid.appendChild(card);
  });

  stories.slice(0, 6).forEach((story) => {
    const latestItem = document.createElement("article");
    latestItem.className = "latest-item";
    latestItem.innerHTML = `
      <span class="story-category">${story.category}</span>
      <h3>${story.title}</h3>
      <p>${story.date}</p>
    `;
    latestList.appendChild(latestItem);
  });

  emptyState.classList.toggle("hidden", filtered.length > 0);
}

searchInput.addEventListener("input", (event) => {
  searchText = event.target.value;
  renderStories();
});

createChips();

if (todayDate) {
  const formattedDate = new Intl.DateTimeFormat("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
  todayDate.textContent = formattedDate;
}

renderStories();

loadArtistDatabase();
renderArtistDatabase();

if (artistForm) {
  artistForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(artistForm);
    const entry = {
      artistName: (formData.get("artistName") || "").toString().trim(),
      artistType: (formData.get("artistType") || "").toString().trim(),
      discipline: (formData.get("discipline") || "").toString().trim(),
      location: (formData.get("location") || "").toString().trim(),
      bio: (formData.get("bio") || "").toString().trim(),
      postTitle: (formData.get("postTitle") || "").toString().trim(),
      postCategory: (formData.get("postCategory") || "").toString().trim(),
      eventDate: (formData.get("eventDate") || "").toString().trim(),
      postDetails: (formData.get("postDetails") || "").toString().trim(),
      createdAt: new Date().toISOString(),
    };

    const hasMissingField = Object.values(entry).some(
      (value) => typeof value === "string" && value.length === 0,
    );

    if (hasMissingField) {
      formNote.textContent = "Please complete all fields before publishing.";
      return;
    }

    artistDatabase.push(entry);
    saveArtistDatabase();
    renderArtistDatabase();
    artistForm.reset();
    formNote.textContent = "Artist profile saved and activity published.";
  });
}
