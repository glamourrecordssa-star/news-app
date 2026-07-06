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
const previewPostBtn = document.getElementById("previewPostBtn");
const postPreview = document.getElementById("postPreview");
const previewTitle = document.getElementById("previewTitle");
const previewMeta = document.getElementById("previewMeta");
const previewArtistLine = document.getElementById("previewArtistLine");
const previewBio = document.getElementById("previewBio");
const previewDetails = document.getElementById("previewDetails");
const adminLoginForm = document.getElementById("adminLoginForm");
const adminUsername = document.getElementById("adminUsername");
const adminPassword = document.getElementById("adminPassword");
const adminNote = document.getElementById("adminNote");
const adminControls = document.getElementById("adminControls");
const adminLogout = document.getElementById("adminLogout");
const clearAllPosts = document.getElementById("clearAllPosts");

const artistStorageKey = "artbeat_artist_posts";
const adminSessionKey = "artbeat_super_admin";
const superAdmin = {
  username: "superadmin",
  password: "ArtBeat@2026",
};

const categories = ["All", ...new Set(stories.map((story) => story.category))];
let activeCategory = "All";
let searchText = "";
let artistDatabase = [];
let isSuperAdmin = false;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createPostId() {
  return `post-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function loadAdminSession() {
  isSuperAdmin = sessionStorage.getItem(adminSessionKey) === "true";
}

function updateAdminDisplay() {
  if (!adminLoginForm || !adminControls) {
    return;
  }

  adminLoginForm.classList.toggle("hidden", isSuperAdmin);
  adminControls.classList.toggle("hidden", !isSuperAdmin);
}

function collectFormEntry() {
  if (!artistForm) {
    return null;
  }

  const formData = new FormData(artistForm);

  return {
    postId: createPostId(),
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
}

function hasMissingFields(entry) {
  if (!entry) {
    return true;
  }

  return Object.entries(entry).some(([key, value]) => {
    if (key === "postId" || key === "createdAt") {
      return false;
    }
    return typeof value === "string" && value.length === 0;
  });
}

function renderPostPreview(entry) {
  if (
    !postPreview ||
    !previewTitle ||
    !previewMeta ||
    !previewArtistLine ||
    !previewBio ||
    !previewDetails
  ) {
    return;
  }

  previewTitle.textContent = entry.postTitle;
  previewMeta.textContent = `${entry.postCategory} • ${formatEventDate(entry.eventDate)}`;
  previewArtistLine.textContent = `${entry.artistName} (${entry.artistType}) • ${entry.discipline} • ${entry.location}`;
  previewBio.textContent = entry.bio;
  previewDetails.textContent = entry.postDetails;
  postPreview.classList.remove("hidden");
}

function createArtistPostMarkup(entry) {
  const safeTitle = escapeHtml(entry.postTitle);
  const safeCategory = escapeHtml(entry.postCategory);
  const safeArtistName = escapeHtml(entry.artistName);
  const safeArtistType = escapeHtml(entry.artistType);
  const safeDiscipline = escapeHtml(entry.discipline);
  const safeLocation = escapeHtml(entry.location);
  const safeBio = escapeHtml(entry.bio);
  const safeDetails = escapeHtml(entry.postDetails);

  return `
    <h4>${safeTitle}</h4>
    <p class="artist-post-meta">${safeCategory} • ${formatEventDate(entry.eventDate)}</p>
    <p><strong>${safeArtistName}</strong> (${safeArtistType}) • ${safeDiscipline} • ${safeLocation}</p>
    <p>${safeBio}</p>
    <p>${safeDetails}</p>
  `;
}

function loadArtistDatabase() {
  try {
    const raw = localStorage.getItem(artistStorageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    artistDatabase = parsed.map((entry) => ({
      ...entry,
      postId: entry.postId || createPostId(),
    }));
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
      card.dataset.postId = entry.postId;

      card.innerHTML = createArtistPostMarkup(entry);

      if (isSuperAdmin) {
        const actions = document.createElement("div");
        actions.className = "post-actions";
        actions.innerHTML = `
          <button type="button" class="secondary-btn danger-btn" data-delete-post="${entry.postId}">
            Delete Post
          </button>
        `;
        card.appendChild(actions);
      }

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
loadAdminSession();
updateAdminDisplay();
renderArtistDatabase();

if (previewPostBtn) {
  previewPostBtn.addEventListener("click", () => {
    const entry = collectFormEntry();

    if (hasMissingFields(entry)) {
      formNote.textContent = "Complete all fields to preview your post.";
      return;
    }

    formNote.textContent = "Preview ready. Check the card below before publishing.";
    renderPostPreview(entry);
  });
}

if (artistForm) {
  artistForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const entry = collectFormEntry();

    if (hasMissingFields(entry)) {
      formNote.textContent = "Please complete all fields before publishing.";
      return;
    }

    artistDatabase.push(entry);
    saveArtistDatabase();
    renderArtistDatabase();
    if (postPreview) {
      postPreview.classList.add("hidden");
    }
    artistForm.reset();
    formNote.textContent = "Artist profile saved and activity published.";
  });
}

if (artistPosts) {
  artistPosts.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-post]");
    if (!deleteButton || !isSuperAdmin) {
      return;
    }

    const postId = deleteButton.getAttribute("data-delete-post");
    if (!postId) {
      return;
    }

    artistDatabase = artistDatabase.filter((entry) => entry.postId !== postId);
    saveArtistDatabase();
    renderArtistDatabase();
  });
}

if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = (adminUsername?.value || "").trim();
    const password = (adminPassword?.value || "").trim();

    if (username === superAdmin.username && password === superAdmin.password) {
      isSuperAdmin = true;
      sessionStorage.setItem(adminSessionKey, "true");
      updateAdminDisplay();
      renderArtistDatabase();
      adminLoginForm.reset();
      adminNote.textContent = "Super Admin logged in.";
      return;
    }

    adminNote.textContent = "Invalid credentials. Please try again.";
  });
}

if (adminLogout) {
  adminLogout.addEventListener("click", () => {
    isSuperAdmin = false;
    sessionStorage.removeItem(adminSessionKey);
    updateAdminDisplay();
    renderArtistDatabase();
    if (adminNote) {
      adminNote.textContent = "Logged out.";
    }
  });
}

if (clearAllPosts) {
  clearAllPosts.addEventListener("click", () => {
    if (!isSuperAdmin) {
      return;
    }

    artistDatabase = [];
    saveArtistDatabase();
    renderArtistDatabase();
    if (adminNote) {
      adminNote.textContent = "All artist posts removed.";
    }
  });
}
