import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNz8Rmq3OKDowDyRIEBhM5rpAJUbDvzC0",
  authDomain: "orange-boys.firebaseapp.com",
  databaseURL: "https://orange-boys-default-rtdb.firebaseio.com",
  projectId: "orange-boys",
  storageBucket: "orange-boys.firebasestorage.app",
  messagingSenderId: "212716956910",
  appId: "1:212716956910:web:4bed8bd325671d89c857ff"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);
console.log("Firebase initialized", app.name, { authEnabled: true, databaseEnabled: true, firestoreEnabled: true });

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // Load state and credentials from localStorage (or use defaults)
  loadAppState();

  renderHeroBackground();
  renderSiteBackground();
  renderSectionBackgrounds();
  renderHeroText();
  renderNews();
  renderMatches();
  renderSeasonCalendar();
  renderLeagueTable();
  renderTrainingEvents();
  renderSponsors();
  renderSocialLinks();
  renderSquad();
  renderCoaches();
  renderMedia();
  renderAds();
  setupToggles();
  setupAdminLogin();
  setupAdminNavReveal();
});

const STORAGE_KEY_STATE = "footballPlatformState";
const STORAGE_KEY_ADMIN = "footballPlatformAdmin";

const defaultNewsItems = [
  {
    title: "Club announces pre‑season tour",
    summary:
      "The team will travel for a three‑game pre‑season tour to prepare for the new campaign.",
  },
  {
    title: "New signing joins the squad",
    summary:
      "A dynamic attacking midfielder has signed a three‑year deal with the club.",
  },
  {
    title: "Academy prospect makes first‑team debut",
    summary:
      "The 19‑year‑old defender impressed in his first senior appearance at the weekend.",
  },
];

const defaultUpcomingMatches = [
  {
    home: "Your FC",
    away: "Rivals United",
    date: "Sat 28 Feb, 3:00 PM",
    venue: "Home Stadium",
    competition: "League Matchday 23",
  },
  {
    home: "City Rovers",
    away: "Your FC",
    date: "Wed 4 Mar, 7:45 PM",
    venue: "Rovers Arena",
    competition: "Cup Quarter‑Final",
  },
  {
    home: "Your FC",
    away: "Harbour Town",
    date: "Sun 9 Mar, 5:30 PM",
    venue: "Home Stadium",
    competition: "League Matchday 24",
  },
];

const defaultMatchResults = [
  {
    home: "Your FC",
    away: "Old Town",
    homeScore: 2,
    awayScore: 1,
    date: "Last Sat",
    competition: "League Matchday 22",
  },
  {
    home: "Lakeside",
    away: "Your FC",
    homeScore: 0,
    awayScore: 3,
    date: "Last Wed",
    competition: "League Matchday 21",
  },
  {
    home: "Your FC",
    away: "Northbridge",
    homeScore: 1,
    awayScore: 1,
    date: "Two weeks ago",
    competition: "Cup Round of 16",
  },
];

const defaultLeagueTable = [
  { team: "Your FC", played: 22, won: 14, drawn: 4, lost: 4, gf: 38, ga: 19, points: 46 },
  { team: "Rivals United", played: 22, won: 13, drawn: 5, lost: 4, gf: 35, ga: 21, points: 44 },
  { team: "City Rovers", played: 22, won: 12, drawn: 6, lost: 4, gf: 32, ga: 20, points: 42 },
  { team: "Harbour Town", played: 22, won: 11, drawn: 5, lost: 6, gf: 29, ga: 24, points: 38 },
  { team: "Old Town", played: 22, won: 9, drawn: 7, lost: 6, gf: 27, ga: 25, points: 34 },
  { team: "Northbridge", played: 22, won: 8, drawn: 6, lost: 8, gf: 24, ga: 26, points: 30 },
];

const defaultPlayers = [
  { number: 1, name: "Alex Carter", age: 29, nationality: "England", position: "Goalkeeper", foot: "Right" },
  { number: 2, name: "Miguel Santos", age: 25, nationality: "Portugal", position: "Right Back", foot: "Right" },
  { number: 3, name: "Luca Marino", age: 27, nationality: "Italy", position: "Left Back", foot: "Left" },
  { number: 4, name: "Jonas Keller", age: 26, nationality: "Germany", position: "Centre Back", foot: "Right" },
  { number: 5, name: "Samuel Okafor", age: 24, nationality: "Nigeria", position: "Centre Back", foot: "Right" },
  { number: 6, name: "Pierre Dubois", age: 30, nationality: "France", position: "Defensive Midfielder", foot: "Right" },
  { number: 7, name: "Rafael Costa", age: 23, nationality: "Brazil", position: "Right Winger", foot: "Right" },
  { number: 8, name: "David Hughes", age: 28, nationality: "Wales", position: "Central Midfielder", foot: "Right" },
  { number: 9, name: "Leo Martínez", age: 27, nationality: "Argentina", position: "Striker", foot: "Left" },
  { number: 10, name: "Adil Farouk", age: 26, nationality: "Morocco", position: "Attacking Midfielder", foot: "Right" },
  { number: 11, name: "Noah Jensen", age: 22, nationality: "Denmark", position: "Left Winger", foot: "Left" },
  { number: 12, name: "Ryan Cole", age: 21, nationality: "USA", position: "Goalkeeper", foot: "Right" },
  { number: 13, name: "Marco Silva", age: 24, nationality: "Brazil", position: "Centre Back", foot: "Left" },
  { number: 14, name: "Tariq Khan", age: 23, nationality: "Pakistan", position: "Central Midfielder", foot: "Right" },
  { number: 15, name: "Oliver Novak", age: 25, nationality: "Croatia", position: "Centre Back", foot: "Right" },
  { number: 16, name: "Diego Ramos", age: 22, nationality: "Spain", position: "Central Midfielder", foot: "Left" },
  { number: 17, name: "Ethan Brown", age: 20, nationality: "England", position: "Right Winger", foot: "Right" },
  { number: 18, name: "Felix Müller", age: 24, nationality: "Germany", position: "Forward", foot: "Right" },
  { number: 19, name: "Ivan Petrov", age: 27, nationality: "Serbia", position: "Striker", foot: "Right" },
  { number: 20, name: "Kofi Mensah", age: 21, nationality: "Ghana", position: "Forward", foot: "Right" },
  { number: 21, name: "Sven Lindberg", age: 23, nationality: "Sweden", position: "Left Back", foot: "Left" },
  { number: 22, name: "Joel Park", age: 24, nationality: "South Korea", position: "Right Back", foot: "Right" },
  { number: 23, name: "Mateo Ruiz", age: 19, nationality: "Colombia", position: "Attacking Midfielder", foot: "Left" },
  { number: 24, name: "Tommy Clark", age: 22, nationality: "Scotland", position: "Defensive Midfielder", foot: "Right" },
  { number: 25, name: "Yusuf Ibrahim", age: 20, nationality: "Egypt", position: "Forward", foot: "Left" },
];

const defaultCoaches = [
  {
    role: "Head Coach",
    name: "Michael Roberts",
    age: 48,
    nationality: "England",
    philosophy: "High‑pressing, attacking football.",
  },
  {
    role: "Assistant Coach",
    name: "Jorge Alvarez",
    age: 44,
    nationality: "Spain",
    philosophy: "Positional play and ball retention.",
  },
  {
    role: "Goalkeeping Coach",
    name: "Stefan Richter",
    age: 50,
    nationality: "Germany",
    philosophy: "Shot‑stopping and build‑up from the back.",
  },
];

const defaultSponsors = [
  {
    name: "Main Shirt Sponsor",
    description: "Primary club sponsor appearing on the front of the home shirt.",
    website: "https://example.com",
  },
  {
    name: "Training Partner",
    description: "Supports training ground facilities and equipment.",
    website: "",
  },
];

const defaultSocialLinks = [
  {
    platform: "Twitter",
    label: "Follow us on Twitter",
    url: "https://twitter.com/yourclub",
  },
  {
    platform: "Facebook",
    label: "Like our Facebook page",
    url: "https://facebook.com/yourclub",
  },
  {
    platform: "Instagram",
    label: "See photos on Instagram",
    url: "https://instagram.com/yourclub",
  },
];

// In‑memory application state (news, matches, squad, coaches, media, hero, club identity)
let appState = {
  newsItems: [...defaultNewsItems],
  upcomingMatches: [...defaultUpcomingMatches],
  matchResults: [...defaultMatchResults],
  players: [...defaultPlayers],
  coaches: [...defaultCoaches],
  mediaItems: [],
  sponsors: [...defaultSponsors],
  socialLinks: [...defaultSocialLinks],
  heroBackground: null,
  heroBackgroundColor: null,
  siteBackground: null,
  siteBackgroundColor: null,
  sectionBackgrounds: {
    matches: null,
    training: null,
    coaches: null,
    players: null,
    media: null,
    sponsors: null,
    social: null,
  },
  sectionBackgroundColors: {
    matches: null,
    training: null,
    coaches: null,
    players: null,
    media: null,
    sponsors: null,
    social: null,
  },
  clubName: "Your Football Club",
  clubTagline: "Official hub for news, fixtures, results & squad.",
  leagueTable: [...defaultLeagueTable],
  trainingEvents: [],
  theme: "default",
  ads: {
    inlinePlayers: "",
    inlinePlayersMedia: "",
    bottomMain: "",
  },
};

function loadAppState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_STATE);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    appState = {
      newsItems: Array.isArray(parsed.newsItems) && parsed.newsItems.length ? parsed.newsItems : [...defaultNewsItems],
      upcomingMatches: Array.isArray(parsed.upcomingMatches) && parsed.upcomingMatches.length ? parsed.upcomingMatches : [...defaultUpcomingMatches],
      matchResults: Array.isArray(parsed.matchResults) && parsed.matchResults.length ? parsed.matchResults : [...defaultMatchResults],
      players: Array.isArray(parsed.players) && parsed.players.length ? parsed.players : [...defaultPlayers],
      coaches: Array.isArray(parsed.coaches) && parsed.coaches.length ? parsed.coaches : [...defaultCoaches],
      mediaItems: Array.isArray(parsed.mediaItems) ? parsed.mediaItems : [],
      heroBackground: parsed.heroBackground || null,
      heroBackgroundColor: parsed.heroBackgroundColor || null,
      sponsors: Array.isArray(parsed.sponsors) && parsed.sponsors.length ? parsed.sponsors : [...defaultSponsors],
      socialLinks: Array.isArray(parsed.socialLinks) && parsed.socialLinks.length ? parsed.socialLinks : [...defaultSocialLinks],
      siteBackground: parsed.siteBackground || null,
      siteBackgroundColor: parsed.siteBackgroundColor || null,
      sectionBackgrounds: parsed.sectionBackgrounds || {
        matches: null,
        training: null,
        coaches: null,
        players: null,
        media: null,
        sponsors: null,
        social: null,
      },
      sectionBackgroundColors: parsed.sectionBackgroundColors || {
        matches: null,
        training: null,
        coaches: null,
        players: null,
        media: null,
        sponsors: null,
        social: null,
      },
      clubName: parsed.clubName || "Your Football Club",
      clubTagline: parsed.clubTagline || "Official hub for news, fixtures, results & squad.",
      leagueTable: Array.isArray(parsed.leagueTable) && parsed.leagueTable.length ? parsed.leagueTable : [...defaultLeagueTable],
      trainingEvents: Array.isArray(parsed.trainingEvents) ? parsed.trainingEvents : [],
      theme: parsed.theme || "default",
      ads: parsed.ads || {
        inlinePlayers: "",
        inlinePlayersMedia: "",
        bottomMain: "",
      },
    };
  } catch (e) {
    console.error("Failed to load saved state, falling back to defaults.", e);
    appState = {
      newsItems: [...defaultNewsItems],
      upcomingMatches: [...defaultUpcomingMatches],
      matchResults: [...defaultMatchResults],
      players: [...defaultPlayers],
      coaches: [...defaultCoaches],
      mediaItems: [],
      heroBackground: null,
      heroBackgroundColor: null,
      sponsors: [...defaultSponsors],
      socialLinks: [...defaultSocialLinks],
      siteBackground: null,
      siteBackgroundColor: null,
      sectionBackgrounds: {
        matches: null,
        training: null,
        coaches: null,
        players: null,
        media: null,
        sponsors: null,
        social: null,
      },
      sectionBackgroundColors: {
        matches: null,
        training: null,
        coaches: null,
        players: null,
        media: null,
        sponsors: null,
        social: null,
      },
      clubName: "Your Football Club",
      clubTagline: "Official hub for news, fixtures, results & squad.",
      leagueTable: [...defaultLeagueTable],
      trainingEvents: [],
      theme: "default",
      ads: {
        inlinePlayers: "",
        inlinePlayersMedia: "",
        bottomMain: "",
      },
    };
  }
}

function saveAppState() {
  try {
    window.localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(appState));
  } catch (e) {
    console.error("Failed to save state.", e);
  }
}

function renderHeroBackground() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  if (appState.heroBackground) {
    hero.style.backgroundImage = `linear-gradient(135deg, rgba(2, 6, 23, 0.7), rgba(2, 6, 23, 0.7)), url('${appState.heroBackground}')`;
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";
    hero.style.backgroundColor = "";
  } else if (appState.heroBackgroundColor) {
    hero.style.backgroundImage = "none";
    hero.style.backgroundColor = appState.heroBackgroundColor;
  }
}

function renderSiteBackground() {
  const body = document.body;
  if (!body) return;

  if (appState.siteBackground) {
    body.style.backgroundImage = `linear-gradient(180deg, rgba(2, 6, 23, 0.5), rgba(2, 6, 23, 0.85)), url('${appState.siteBackground}')`;
    body.style.backgroundSize = "cover";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundPosition = "center top";
    body.style.backgroundColor = "";
  } else if (appState.siteBackgroundColor) {
    body.style.backgroundImage = "none";
    body.style.backgroundColor = appState.siteBackgroundColor;
  }
}

function renderSectionBackgrounds() {
  const map = appState.sectionBackgrounds || {};
  const colors = appState.sectionBackgroundColors || {};

  const apply = (sectionId, image, color) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    if (image) {
      section.style.backgroundImage = `linear-gradient(180deg, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url('${image}')`;
      section.style.backgroundSize = "cover";
      section.style.backgroundPosition = "center";
      section.style.backgroundRepeat = "no-repeat";
      section.style.backgroundColor = "";
    } else if (color) {
      section.style.backgroundImage = "none";
      section.style.backgroundColor = color;
    }
  };

  apply("matches", map.matches, colors.matches);
  apply("training", map.training, colors.training);
  apply("coaches", map.coaches, colors.coaches);
  apply("players", map.players, colors.players);
  apply("media", map.media, colors.media);
  apply("sponsors", map.sponsors, colors.sponsors);
  apply("social", map.social, colors.social);
}

function renderHeroText() {
  const nameEl = document.getElementById("club-name");
  const taglineEl = document.getElementById("club-tagline");
  if (nameEl) nameEl.textContent = appState.clubName || "Your Football Club";
  if (taglineEl) taglineEl.textContent = appState.clubTagline || "Official hub for news, fixtures, results & squad.";
}

function renderNews() {
  const list = document.getElementById("news-list");
  if (!list) return;
  list.innerHTML = appState.newsItems
    .map(
      (item) => `
        <article class="card">
          ${
            item.image
              ? `<div class="player-photo"><img src="${item.image}" alt="${item.title}" /></div>`
              : ""
          }
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
        </article>
      `
    )
    .join("");
}

function renderMatches() {
  const upcomingContainer = document.getElementById("upcoming-matches");
  const resultsContainer = document.getElementById("match-results");
  if (!upcomingContainer || !resultsContainer) return;

  upcomingContainer.innerHTML = appState.upcomingMatches
    .map(
      (m) => `
        <article class="card">
          <h3>${m.home} vs ${m.away}</h3>
          <div class="match-meta match-meta--stack">
            <span><strong>Date:</strong> ${m.date}</span>
            <span><strong>Venue:</strong> ${m.venue}</span>
            <span><strong>Competition:</strong> ${m.competition}</span>
          </div>
        </article>
      `
    )
    .join("");

  resultsContainer.innerHTML = appState.matchResults
    .map(
      (m) => `
        <article class="card">
          <h3>${m.home} vs ${m.away}</h3>
          <p class="match-score">${m.homeScore} - ${m.awayScore}</p>
          <div class="match-meta">
            <span><strong>Date:</strong> ${m.date}</span>
            <span><strong>Competition:</strong> ${m.competition}</span>
          </div>
        </article>
      `
    )
    .join("");

  renderSeasonCalendar();
}

function renderSeasonCalendar() {
  const container = document.getElementById("season-calendar");
  if (!container) return;

  const fixtures = appState.upcomingMatches.map((m) => ({
    kind: "fixture",
    label: `${m.home} vs ${m.away}`,
    date: m.date,
    competition: m.competition,
  }));

  const results = appState.matchResults.map((m) => ({
    kind: "result",
    label: `${m.home} vs ${m.away}`,
    date: m.date,
    competition: m.competition,
    score: `${m.homeScore} - ${m.awayScore}`,
  }));

  const entries = [...fixtures, ...results];

  if (!entries.length) {
    container.innerHTML = `<p class="season-calendar-empty">No fixtures or results added yet.</p>`;
    return;
  }

  container.innerHTML = entries
    .map(
      (entry) => `
        <article class="card season-calendar-item">
          <div class="season-calendar-header">
            <span class="season-calendar-pill season-calendar-pill-${entry.kind}">
              ${entry.kind === "fixture" ? "Fixture" : "Result"}
            </span>
            <span class="season-calendar-date">${entry.date}</span>
          </div>
          <h3>${entry.label}</h3>
          <p class="season-calendar-meta">
            <strong>Competition:</strong> ${entry.competition}
            ${
              entry.kind === "result"
                ? `<span class="season-calendar-score">${entry.score}</span>`
                : ""
            }
          </p>
        </article>
      `
    )
    .join("");
}

function renderLeagueTable() {
  const container = document.getElementById("league-table");
  if (!container) return;

  if (!appState.leagueTable || !appState.leagueTable.length) {
    container.innerHTML = `<p class="season-calendar-empty">No league table data yet.</p>`;
    return;
  }

  const rows = [...appState.leagueTable]
    .sort((a, b) => b.points - a.points)
    .map(
      (team, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${team.team}</td>
          <td>${team.played}</td>
          <td>${team.won}</td>
          <td>${team.drawn}</td>
          <td>${team.lost}</td>
          <td>${team.gf}</td>
          <td>${team.ga}</td>
          <td>${team.points}</td>
        </tr>
      `
    )
    .join("");

  container.innerHTML = `
    <article class="card league-table-card">
      <table class="league-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </article>
  `;
}

function renderTrainingEvents() {
  const grid = document.getElementById("training-events-grid");
  if (!grid) return;

  if (!appState.trainingEvents || !appState.trainingEvents.length) {
    grid.innerHTML = `<p class="season-calendar-empty">No training sessions or events added yet.</p>`;
    return;
  }

  grid.innerHTML = appState.trainingEvents
    .map(
      (e) => `
        <article class="card training-card">
          <h3>${e.title}</h3>
          <p class="training-meta">
            <span><strong>Date / time:</strong> ${e.date}</span>
            <span><strong>Location:</strong> ${e.location}</span>
            <span><strong>Type:</strong> ${e.type}</span>
          </p>
          ${
            e.notes
              ? `<p class="training-notes">${e.notes}</p>`
              : ""
          }
        </article>
      `
    )
    .join("");
}

function renderSponsors() {
  const grid = document.getElementById("sponsors-grid");
  if (!grid) return;

  if (!appState.sponsors || !appState.sponsors.length) {
    grid.innerHTML = `<p class="season-calendar-empty">No sponsors added yet.</p>`;
    return;
  }

  grid.innerHTML = appState.sponsors
    .map((s) => {
      const initial = s.name && s.name.trim() ? s.name.trim().charAt(0).toUpperCase() : "S";
      return `
        <article class="card sponsor-card">
          <div class="sponsor-card-inner">
            <div class="sponsor-badge">
              ${
                s.logo
                  ? `<img src="${s.logo}" alt="${s.name || "Sponsor"} logo" />`
                  : `<span class="sponsor-badge-fallback">${initial}</span>`
              }
            </div>
            <div class="sponsor-body">
              <div class="sponsor-name-row">
                <h3 class="sponsor-name">${s.name || "Sponsor"}</h3>
                ${
                  s.website
                    ? `<a href="${s.website}" target="_blank" rel="noopener noreferrer" class="sponsor-link">Visit site</a>`
                    : ""
                }
              </div>
              ${
                s.description
                  ? `<p class="sponsor-description">${s.description}</p>`
                  : ""
              }
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSocialLinks() {
  const grid = document.getElementById("social-links-grid");
  if (!grid) return;

  if (!appState.socialLinks || !appState.socialLinks.length) {
    grid.innerHTML = `<p class="season-calendar-empty">No social media links added yet.</p>`;
    return;
  }

  grid.innerHTML = appState.socialLinks
    .map((link) => {
      const initial = link.platform && link.platform.trim() ? link.platform.trim().charAt(0).toUpperCase() : "S";
      return `
        <article class="card social-card">
          <div class="social-card-inner">
            <div class="social-icon-circle">${initial}</div>
            <div class="social-body">
              <div class="social-platform">${link.platform || "Social"}</div>
              ${
                link.url
                  ? `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-url">${link.url}</a>`
                  : ""
              }
              ${
                link.label
                  ? `<p class="social-label">${link.label}</p>`
                  : ""
              }
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSquad() {
  const grid = document.getElementById("players-grid");
  if (!grid) return;
  grid.innerHTML = appState.players
    .map(
      (p) => `
        <article class="card player-card">
          <div class="player-card-inner">
            <div class="player-card-left">
              ${
                p.image
                  ? `<div class="player-photo"><img src="${p.image}" alt="${p.name}" /></div>`
                  : `<div class="player-photo"></div>`
              }
            </div>
            <div class="player-card-right">
              <div class="player-header">
                <div class="player-name-position">
                  <div class="player-name">${p.name}</div>
                  <div class="player-position">${p.position}</div>
                </div>
                <div class="player-number">${p.number}</div>
              </div>
              <div class="player-bio">
                <div class="player-bio-line"><strong>Position:</strong> ${p.position}</div>
                <div class="player-bio-line"><strong>Age:</strong> ${p.age}</div>
                <div class="player-bio-line"><strong>Nationality:</strong> ${p.nationality}</div>
                <div class="player-bio-line"><strong>Favourite foot:</strong> ${p.foot}</div>
              </div>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCoaches() {
  const grid = document.getElementById("coaches-grid");
  if (!grid) return;
  const limited = appState.coaches.slice(0, 3);
  grid.innerHTML = limited
    .map(
      (c) => `
        <article class="card">
          ${
            c.image
              ? `<div class="coach-photo"><img src="${c.image}" alt="${c.name}" /></div>`
              : ""
          }
          <div class="coach-role">${c.role}</div>
          <div class="coach-name">${c.name}</div>
          <p class="coach-meta">
            <strong>Age:</strong> ${c.age} &nbsp;•&nbsp;
            <strong>Nationality:</strong> ${c.nationality}
          </p>
          <p>${c.philosophy}</p>
        </article>
      `
    )
    .join("");
}

function renderMedia() {
  const grid = document.getElementById("media-grid");
  if (!grid) return;
  grid.innerHTML = appState.mediaItems
    .map((m, index) => {
      if (m.type === "video") {
        return `
        <article class="card">
          <h3>${m.title || "Team video"}</h3>
          <video controls width="100%" src="${m.url}"></video>
        </article>
      `;
      }
      return `
        <article class="card">
          <h3>${m.title || "Team photo"}</h3>
          <div class="player-photo"><img src="${m.url}" alt="${m.title || "Team image"}" /></div>
        </article>
      `;
    })
    .join("");
}

function renderAds() {
  const slotInlinePlayers = document.getElementById("ad-inline-players");
  const slotInlinePlayersMedia = document.getElementById("ad-inline-players-media");
  const slotBottomMain = document.getElementById("ad-bottom-main");

  const ads = appState.ads || {
    inlinePlayers: "",
    inlinePlayersMedia: "",
    bottomMain: "",
  };

  if (slotInlinePlayers) {
    slotInlinePlayers.innerHTML = ads.inlinePlayers || "";
  }
  if (slotInlinePlayersMedia) {
    slotInlinePlayersMedia.innerHTML = ads.inlinePlayersMedia || "";
  }
  if (slotBottomMain) {
    slotBottomMain.innerHTML = ads.bottomMain || "";
  }
}

function setupToggles() {
  // Players (first team squad)
  setupSectionToggle("squad-toggle-card", "players-panel");
  // Latest news
  setupSectionToggle("news-toggle-card", "news-panel");
  // Sponsors
  setupSectionToggle("sponsors-toggle-card", "sponsors-panel");
  // Social media
  setupSectionToggle("social-toggle-card", "social-panel");
  // Matches (fixtures & results)
  setupSectionToggle("matches-toggle-card", "matches-panel");
   // Training & events
  setupSectionToggle("training-toggle-card", "training-panel");
  // Coaching staff
  setupSectionToggle("coaches-toggle-card", "coaches-panel");

  // Admin dashboard cards (collapse/expand each settings area)
  setupSectionToggle("admin-identity-toggle", "admin-identity-panel");
  setupSectionToggle("admin-news-toggle", "admin-news-panel");
  setupSectionToggle("admin-stats-toggle", "admin-stats-panel");
  setupSectionToggle("admin-matches-toggle", "admin-matches-panel");
  setupSectionToggle("admin-players-toggle", "admin-players-panel");
  setupSectionToggle("admin-sponsors-toggle", "admin-sponsors-panel");
  setupSectionToggle("admin-social-toggle", "admin-social-panel");
  setupSectionToggle("admin-coaches-toggle", "admin-coaches-panel");
  setupSectionToggle("admin-media-toggle", "admin-media-panel");
  setupSectionToggle("admin-training-toggle", "admin-training-panel");
  setupSectionToggle("admin-appearance-toggle", "admin-appearance-panel");
  setupSectionToggle("admin-credentials-toggle", "admin-credentials-panel");
  setupSectionToggle("admin-ads-toggle", "admin-ads-panel");
}

function setupSectionToggle(toggleId, panelId) {
  const toggleCard = document.getElementById(toggleId);
  const panel = document.getElementById(panelId);
  const icon = toggleCard
    ? toggleCard.querySelector(".toggle-icon")
    : null;

  if (!toggleCard || !panel) return;

  toggleCard.addEventListener("click", () => {
    const isOpen =
      panel.classList.contains("players-panel") || panel.classList.contains("section-panel")
        ? panel.classList.toggle("is-open")
        : panel.classList.toggle("is-open");

    if (icon) {
      icon.textContent = isOpen ? "▲" : "▼";
    }
  });
}

function getStoredAdminCredentials() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_ADMIN);
    if (!raw) {
      return { username: "admin", password: "admin" };
    }
    const parsed = JSON.parse(raw);
    if (!parsed.username || !parsed.password) {
      return { username: "admin", password: "admin" };
    }
    return parsed;
  } catch (e) {
    console.error("Failed to load admin credentials, using defaults.", e);
    return { username: "admin", password: "admin" };
  }
}

function saveAdminCredentials(creds) {
  try {
    window.localStorage.setItem(STORAGE_KEY_ADMIN, JSON.stringify(creds));
  } catch (e) {
    console.error("Failed to save admin credentials.", e);
  }
}

function setupAdminLogin() {
  const form = document.getElementById("admin-login-form");
  const usernameInput = document.getElementById("admin-username");
  const passwordInput = document.getElementById("admin-password");
  const errorEl = document.getElementById("admin-error");
  const panel = document.getElementById("admin-panel");
  const loginCard = document.getElementById("admin-login-card");

  if (!form || !usernameInput || !passwordInput || !panel || !loginCard) return;

  let currentCreds = getStoredAdminCredentials();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = usernameInput.value.trim();
    const pass = passwordInput.value;

    if (user === currentCreds.username && pass === currentCreds.password) {
      if (errorEl) errorEl.textContent = "";
      panel.hidden = false;
      loginCard.style.display = "none";
      setupAdminManagement();
    } else {
      if (errorEl) {
        errorEl.textContent = "Invalid admin credentials. Please try again.";
      }
    }
  });
}

function setupAdminNavReveal() {
  const adminSection = document.getElementById("admin");
  const adminNavLink = document.querySelector('a[href="#admin"]');

  if (!adminSection || !adminNavLink) return;

  adminNavLink.addEventListener("click", (event) => {
    event.preventDefault();
    const isNowVisible = adminSection.classList.toggle("admin-visible");
    if (isNowVisible) {
      adminSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

// Admin management of content and credentials
function setupAdminManagement() {
  setupAdminNews();
  setupAdminMatches();
  setupAdminPlayers();
  setupAdminCoaches();
  setupAdminSponsors();
  setupAdminSocial();
  setupAdminCredentials();
  setupAdminMedia();
  setupAdminHero();
  setupAdminIdentity();
  setupAdminStats();
  setupAdminTraining();
   setupAdminAds();
  setupAdminLogout();
}

function setupAdminSponsors() {
  const form = document.getElementById("admin-sponsor-form");
  const nameInput = document.getElementById("admin-sponsor-name");
  const descriptionInput = document.getElementById("admin-sponsor-description");
  const websiteInput = document.getElementById("admin-sponsor-website");
  const logoInput = document.getElementById("admin-sponsor-logo");
  const list = document.getElementById("admin-sponsors-list");

  if (!form || !nameInput || !descriptionInput || !websiteInput || !logoInput || !list) return;

  function renderSponsorsList() {
    list.innerHTML = appState.sponsors
      .map(
        (s, index) => `
        <li>
          <span>${s.name || "Sponsor"}</span>
          <button type="button" data-index="${index}" class="admin-remove-btn">Remove</button>
        </li>
      `
      )
      .join("");
  }

  renderSponsorsList();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const website = websiteInput.value.trim();
    const file = logoInput.files && logoInput.files[0];

    if (!name && !description) return;

    const addSponsor = (logo) => {
      appState.sponsors.push({ name, description, website, logo });
      saveAppState();
      renderSponsors();
      renderSponsorsList();
      form.reset();
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        addSponsor(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      addSponsor(undefined);
    }
  });

  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches("button.admin-remove-btn")) {
      const index = Number(target.getAttribute("data-index"));
      if (!Number.isNaN(index)) {
        appState.sponsors.splice(index, 1);
        saveAppState();
        renderSponsors();
        renderSponsorsList();
      }
    }
  });
}

function setupAdminSocial() {
  const form = document.getElementById("admin-social-form");
  const platformInput = document.getElementById("admin-social-platform");
  const labelInput = document.getElementById("admin-social-label");
  const urlInput = document.getElementById("admin-social-url");
  const list = document.getElementById("admin-social-list");

  if (!form || !platformInput || !labelInput || !urlInput || !list) return;

  function renderSocialList() {
    list.innerHTML = appState.socialLinks
      .map(
        (link, index) => `
        <li>
          <span>${link.platform || "Social"} — ${link.url || ""}</span>
          <button type="button" data-index="${index}" class="admin-remove-btn">Remove</button>
        </li>
      `
      )
      .join("");
  }

  renderSocialList();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const platform = platformInput.value.trim();
    const label = labelInput.value.trim();
    const url = urlInput.value.trim();

    if (!platform && !url) return;

    appState.socialLinks.push({ platform, label, url });
    saveAppState();
    renderSocialLinks();
    renderSocialList();
    form.reset();
  });

  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches("button.admin-remove-btn")) {
      const index = Number(target.getAttribute("data-index"));
      if (!Number.isNaN(index)) {
        appState.socialLinks.splice(index, 1);
        saveAppState();
        renderSocialLinks();
        renderSocialList();
      }
    }
  });
}

function setupAdminNews() {
  const form = document.getElementById("admin-news-form");
  const titleInput = document.getElementById("admin-news-title");
  const summaryInput = document.getElementById("admin-news-summary");
  const imageInput = document.getElementById("admin-news-image");
  const listContainer = document.getElementById("admin-news-list");
  if (!form || !titleInput || !summaryInput || !imageInput || !listContainer) return;

  function renderAdminNewsList() {
    listContainer.innerHTML = appState.newsItems
      .map(
        (item, index) => `
        <li>
          <strong>${item.title}</strong>
          <button type="button" data-index="${index}" class="admin-remove-btn">Remove</button>
        </li>
      `
      )
      .join("");
  }

  renderAdminNewsList();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const summary = summaryInput.value.trim();
    const file = imageInput.files && imageInput.files[0];
    if (!title || !summary) return;

    const addNews = (image) => {
      appState.newsItems.push({ title, summary, image });
      saveAppState();
      renderNews();
      renderAdminNewsList();
      form.reset();
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        addNews(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      addNews(undefined);
    }
  });

  listContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches("button.admin-remove-btn")) {
      const index = Number(target.getAttribute("data-index"));
      if (!Number.isNaN(index)) {
        appState.newsItems.splice(index, 1);
        saveAppState();
        renderNews();
        renderAdminNewsList();
      }
    }
  });
}

function setupAdminMatches() {
  const upcomingForm = document.getElementById("admin-upcoming-form");
  const uHome = document.getElementById("admin-upcoming-home");
  const uAway = document.getElementById("admin-upcoming-away");
  const uDate = document.getElementById("admin-upcoming-date");
  const uVenue = document.getElementById("admin-upcoming-venue");
  const uComp = document.getElementById("admin-upcoming-competition");
  const upcomingList = document.getElementById("admin-upcoming-list");

  const resultForm = document.getElementById("admin-result-form");
  const rHome = document.getElementById("admin-result-home");
  const rAway = document.getElementById("admin-result-away");
  const rHomeScore = document.getElementById("admin-result-home-score");
  const rAwayScore = document.getElementById("admin-result-away-score");
  const rDate = document.getElementById("admin-result-date");
  const rComp = document.getElementById("admin-result-competition");
  const resultList = document.getElementById("admin-result-list");

  if (
    !upcomingForm ||
    !uHome ||
    !uAway ||
    !uDate ||
    !uVenue ||
    !uComp ||
    !upcomingList ||
    !resultForm ||
    !rHome ||
    !rAway ||
    !rHomeScore ||
    !rAwayScore ||
    !rDate ||
    !rComp ||
    !resultList
  ) {
    return;
  }

  function renderUpcomingAdminList() {
    upcomingList.innerHTML = appState.upcomingMatches
      .map(
        (m, index) => `
        <li>
          <span>${m.home} vs ${m.away} — ${m.date}</span>
          <button type="button" data-index="${index}" class="admin-remove-btn">Remove</button>
        </li>
      `
      )
      .join("");
  }

  function renderResultAdminList() {
    resultList.innerHTML = appState.matchResults
      .map(
        (m, index) => `
        <li>
          <span>${m.home} ${m.homeScore} - ${m.awayScore} ${m.away} — ${m.date}</span>
          <button type="button" data-index="${index}" class="admin-remove-btn">Remove</button>
        </li>
      `
      )
      .join("");
  }

  renderUpcomingAdminList();
  renderResultAdminList();

  upcomingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const home = uHome.value.trim();
    const away = uAway.value.trim();
    const date = uDate.value.trim();
    const venue = uVenue.value.trim();
    const competition = uComp.value.trim();
    if (!home || !away || !date || !venue || !competition) return;
    appState.upcomingMatches.push({ home, away, date, venue, competition });
    saveAppState();
    renderMatches();
    renderUpcomingAdminList();
    upcomingForm.reset();
  });

  upcomingList.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches("button.admin-remove-btn")) {
      const index = Number(target.getAttribute("data-index"));
      if (!Number.isNaN(index)) {
        appState.upcomingMatches.splice(index, 1);
        saveAppState();
        renderMatches();
        renderUpcomingAdminList();
      }
    }
  });

  resultForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const home = rHome.value.trim();
    const away = rAway.value.trim();
    const homeScore = Number(rHomeScore.value);
    const awayScore = Number(rAwayScore.value);
    const date = rDate.value.trim();
    const competition = rComp.value.trim();
    if (!home || !away || Number.isNaN(homeScore) || Number.isNaN(awayScore) || !date || !competition) return;
    appState.matchResults.push({ home, away, homeScore, awayScore, date, competition });
    saveAppState();
    renderMatches();
    renderResultAdminList();
    resultForm.reset();
  });

  resultList.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches("button.admin-remove-btn")) {
      const index = Number(target.getAttribute("data-index"));
      if (!Number.isNaN(index)) {
        appState.matchResults.splice(index, 1);
        saveAppState();
        renderMatches();
        renderResultAdminList();
      }
    }
  });
}

function setupAdminPlayers() {
  const select = document.getElementById("admin-player-select");
  const numberInput = document.getElementById("admin-player-number");
  const nameInput = document.getElementById("admin-player-name");
  const ageInput = document.getElementById("admin-player-age");
  const nationalityInput = document.getElementById("admin-player-nationality");
  const positionInput = document.getElementById("admin-player-position");
  const footInput = document.getElementById("admin-player-foot");
  const imageInput = document.getElementById("admin-player-image");
  const saveBtn = document.getElementById("admin-player-save");
  const deleteBtn = document.getElementById("admin-player-delete");
  const addBtn = document.getElementById("admin-player-add");

  if (
    !select ||
    !numberInput ||
    !nameInput ||
    !ageInput ||
    !nationalityInput ||
    !positionInput ||
    !footInput ||
    !imageInput ||
    !saveBtn ||
    !deleteBtn ||
    !addBtn
  ) {
    return;
  }

  function renderPlayerOptions() {
    select.innerHTML = appState.players
      .map(
        (p, index) =>
          `<option value="${index}">#${p.number} - ${p.name}</option>`
      )
      .join("");
  }

  function loadSelectedPlayer() {
    const index = Number(select.value);
    if (Number.isNaN(index) || !appState.players[index]) return;
    const p = appState.players[index];
    numberInput.value = p.number;
    nameInput.value = p.name;
    ageInput.value = p.age;
    nationalityInput.value = p.nationality;
    positionInput.value = p.position;
    footInput.value = p.foot;
  }

  renderPlayerOptions();
  if (appState.players.length) {
    select.value = "0";
    loadSelectedPlayer();
  }

  select.addEventListener("change", loadSelectedPlayer);

  imageInput.addEventListener("change", () => {
    const index = Number(select.value);
    const file = imageInput.files && imageInput.files[0];
    if (!file || Number.isNaN(index) || !appState.players[index]) return;
    const reader = new FileReader();
    reader.onload = () => {
      appState.players[index].image = reader.result;
      saveAppState();
      renderSquad();
    };
    reader.readAsDataURL(file);
  });

  saveBtn.addEventListener("click", () => {
    const index = Number(select.value);
    if (Number.isNaN(index) || !appState.players[index]) return;
    const updated = {
      ...appState.players[index],
      number: Number(numberInput.value) || appState.players[index].number,
      name: nameInput.value.trim() || appState.players[index].name,
      age: Number(ageInput.value) || appState.players[index].age,
      nationality: nationalityInput.value.trim() || appState.players[index].nationality,
      position: positionInput.value.trim() || appState.players[index].position,
      foot: footInput.value.trim() || appState.players[index].foot,
    };
    appState.players[index] = updated;
    saveAppState();
    renderSquad();
    renderPlayerOptions();
    select.value = String(index);
  });

  deleteBtn.addEventListener("click", () => {
    const index = Number(select.value);
    if (Number.isNaN(index) || !appState.players[index]) return;
    appState.players.splice(index, 1);
    saveAppState();
    renderSquad();
    renderPlayerOptions();
    if (appState.players.length) {
      select.value = "0";
      loadSelectedPlayer();
    } else {
      numberInput.value = "";
      nameInput.value = "";
      ageInput.value = "";
      nationalityInput.value = "";
      positionInput.value = "";
      footInput.value = "";
    }
  });

  addBtn.addEventListener("click", () => {
    const number = Number(numberInput.value) || appState.players.length + 1;
    const name = nameInput.value.trim() || "New Player";
    const age = Number(ageInput.value) || 20;
    const nationality = nationalityInput.value.trim() || "Unknown";
    const position = positionInput.value.trim() || "Position";
    const foot = footInput.value.trim() || "Right";
    appState.players.push({ number, name, age, nationality, position, foot });
    saveAppState();
    renderSquad();
    renderPlayerOptions();
    select.value = String(appState.players.length - 1);
    loadSelectedPlayer();
  });
}

function setupAdminCoaches() {
  const form = document.getElementById("admin-coach-form");
  const roleInput = document.getElementById("admin-coach-role");
  const nameInput = document.getElementById("admin-coach-name");
  const ageInput = document.getElementById("admin-coach-age");
  const nationalityInput = document.getElementById("admin-coach-nationality");
  const philosophyInput = document.getElementById("admin-coach-philosophy");
  const imageInput = document.getElementById("admin-coach-image");
  const list = document.getElementById("admin-coach-list");

  if (!form || !roleInput || !nameInput || !ageInput || !nationalityInput || !philosophyInput || !imageInput || !list)
    return;

  function renderCoachList() {
    list.innerHTML = appState.coaches
      .map(
        (c, index) => `
        <li>
          <span>${c.role} — ${c.name}</span>
          <button type="button" data-index="${index}" class="admin-remove-btn">Remove</button>
        </li>
      `
      )
      .join("");
  }

  renderCoachList();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const role = roleInput.value.trim();
    const name = nameInput.value.trim();
    const age = Number(ageInput.value);
    const nationality = nationalityInput.value.trim();
    const philosophy = philosophyInput.value.trim();
    const file = imageInput.files && imageInput.files[0];
    if (!role || !name || Number.isNaN(age) || !nationality || !philosophy) return;

    const addCoach = (image) => {
      appState.coaches.push({ role, name, age, nationality, philosophy, image });
      saveAppState();
      renderCoaches();
      renderCoachList();
      form.reset();
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        addCoach(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      addCoach(undefined);
    }
  });

  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches("button.admin-remove-btn")) {
      const index = Number(target.getAttribute("data-index"));
      if (!Number.isNaN(index)) {
        appState.coaches.splice(index, 1);
        saveAppState();
        renderCoaches();
        renderCoachList();
      }
    }
  });
}

function setupAdminCredentials() {
  const form = document.getElementById("admin-credentials-form");
  const currentPasswordInput = document.getElementById("admin-current-password");
  const newUsernameInput = document.getElementById("admin-new-username");
  const newPasswordInput = document.getElementById("admin-new-password");
  const confirmPasswordInput = document.getElementById("admin-confirm-password");
  const statusText = document.getElementById("admin-credentials-status");

  if (!form || !currentPasswordInput || !newUsernameInput || !newPasswordInput || !confirmPasswordInput || !statusText)
    return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const stored = getStoredAdminCredentials();
    const current = currentPasswordInput.value;
    const newUser = newUsernameInput.value.trim() || stored.username;
    const newPass = newPasswordInput.value;
    const confirm = confirmPasswordInput.value;

    if (current !== stored.password) {
      statusText.textContent = "Current password is incorrect.";
      return;
    }
    if (!newPass || newPass !== confirm) {
      statusText.textContent = "New passwords do not match.";
      return;
    }

    saveAdminCredentials({ username: newUser, password: newPass });
    statusText.textContent = "Credentials updated. They will apply next time you log in.";
    form.reset();
  });
}

function setupAdminLogout() {
  const logoutBtn = document.getElementById("admin-logout");
  const panel = document.getElementById("admin-panel");
  const loginCard = document.getElementById("admin-login-card");
  const adminSection = document.getElementById("admin");
  const usernameInput = document.getElementById("admin-username");
  const passwordInput = document.getElementById("admin-password");

  if (!logoutBtn || !panel || !loginCard || !adminSection || !usernameInput || !passwordInput) return;

  logoutBtn.addEventListener("click", () => {
    panel.hidden = true;
    loginCard.style.display = "";
    usernameInput.value = "";
    passwordInput.value = "";
    adminSection.classList.remove("admin-visible");
  });
}

function setupAdminMedia() {
  const form = document.getElementById("admin-media-form");
  const titleInput = document.getElementById("admin-media-title");
  const typeSelect = document.getElementById("admin-media-type");
  const fileInput = document.getElementById("admin-media-file");
  const list = document.getElementById("admin-media-list");

  if (!form || !titleInput || !typeSelect || !fileInput || !list) return;

  function renderMediaList() {
    list.innerHTML = appState.mediaItems
      .map(
        (m, index) => `
        <li>
          <span>${m.type === "video" ? "Video" : "Image"} — ${m.title || "Untitled"}</span>
          <button type="button" data-index="${index}" class="admin-remove-btn">Remove</button>
        </li>
      `
      )
      .join("");
  }

  renderMediaList();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const type = typeSelect.value === "video" ? "video" : "image";
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      appState.mediaItems.push({ title, type, url: reader.result });
      saveAppState();
      renderMedia();
      renderMediaList();
      form.reset();
    };
    reader.readAsDataURL(file);
  });

  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches("button.admin-remove-btn")) {
      const index = Number(target.getAttribute("data-index"));
      if (!Number.isNaN(index)) {
        appState.mediaItems.splice(index, 1);
        saveAppState();
        renderMedia();
        renderMediaList();
      }
    }
  });
}

function setupAdminStats() {
  const form = document.getElementById("admin-stats-form");
  const teamInput = document.getElementById("admin-stats-team");
  const playedInput = document.getElementById("admin-stats-played");
  const wonInput = document.getElementById("admin-stats-won");
  const drawnInput = document.getElementById("admin-stats-drawn");
  const lostInput = document.getElementById("admin-stats-lost");
  const gfInput = document.getElementById("admin-stats-gf");
  const gaInput = document.getElementById("admin-stats-ga");
  const pointsInput = document.getElementById("admin-stats-points");
  const list = document.getElementById("admin-stats-list");

  if (
    !form ||
    !teamInput ||
    !playedInput ||
    !wonInput ||
    !drawnInput ||
    !lostInput ||
    !gfInput ||
    !gaInput ||
    !pointsInput ||
    !list
  )
    return;

  function renderStatsList() {
    list.innerHTML = appState.leagueTable
      .map(
        (t, index) => `
        <li>
          <span>${t.team} — ${t.points} pts</span>
          <button type="button" data-index="${index}" class="admin-remove-btn">Remove</button>
        </li>
      `
      )
      .join("");
  }

  renderStatsList();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const team = teamInput.value.trim();
    const played = Number(playedInput.value);
    const won = Number(wonInput.value);
    const drawn = Number(drawnInput.value);
    const lost = Number(lostInput.value);
    const gf = Number(gfInput.value);
    const ga = Number(gaInput.value);
    const points = Number(pointsInput.value);

    if (!team || [played, won, drawn, lost, gf, ga, points].some((n) => Number.isNaN(n))) return;

    appState.leagueTable.push({ team, played, won, drawn, lost, gf, ga, points });
    saveAppState();
    renderLeagueTable();
    renderStatsList();
    form.reset();
  });

  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches("button.admin-remove-btn")) {
      const index = Number(target.getAttribute("data-index"));
      if (!Number.isNaN(index)) {
        appState.leagueTable.splice(index, 1);
        saveAppState();
        renderLeagueTable();
        renderStatsList();
      }
    }
  });
}

function setupAdminTraining() {
  const form = document.getElementById("admin-training-form");
  const titleInput = document.getElementById("admin-training-title");
  const dateInput = document.getElementById("admin-training-date");
  const locationInput = document.getElementById("admin-training-location");
  const typeInput = document.getElementById("admin-training-type");
  const notesInput = document.getElementById("admin-training-notes");
  const list = document.getElementById("admin-training-list");

  if (
    !form ||
    !titleInput ||
    !dateInput ||
    !locationInput ||
    !typeInput ||
    !notesInput ||
    !list
  )
    return;

  function renderTrainingList() {
    list.innerHTML = appState.trainingEvents
      .map(
        (e, index) => `
        <li>
          <span>${e.title} — ${e.date}</span>
          <button type="button" data-index="${index}" class="admin-remove-btn">Remove</button>
        </li>
      `
      )
      .join("");
  }

  renderTrainingList();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const date = dateInput.value.trim();
    const location = locationInput.value.trim();
    const type = typeInput.value.trim();
    const notes = notesInput.value.trim();

    if (!title || !date || !location || !type) return;

    appState.trainingEvents.push({ title, date, location, type, notes });
    saveAppState();
    renderTrainingEvents();
    renderTrainingList();
    form.reset();
  });

  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches("button.admin-remove-btn")) {
      const index = Number(target.getAttribute("data-index"));
      if (!Number.isNaN(index)) {
        appState.trainingEvents.splice(index, 1);
        saveAppState();
        renderTrainingEvents();
        renderTrainingList();
      }
    }
  });
}

function setupAdminHero() {
  const heroForm = document.getElementById("admin-hero-form");
  const heroFileInput = document.getElementById("admin-hero-image");
  const siteForm = document.getElementById("admin-site-bg-form");
  const siteFileInput = document.getElementById("admin-site-bg-image");
  const statusEl = document.getElementById("admin-appearance-status");
  const matchesForm = document.getElementById("admin-bg-matches-form");
  const matchesFile = document.getElementById("admin-bg-matches-image");
  const trainingForm = document.getElementById("admin-bg-training-form");
  const trainingFile = document.getElementById("admin-bg-training-image");
  const coachesForm = document.getElementById("admin-bg-coaches-form");
  const coachesFile = document.getElementById("admin-bg-coaches-image");
  const playersForm = document.getElementById("admin-bg-players-form");
  const playersFile = document.getElementById("admin-bg-players-image");
  const mediaForm = document.getElementById("admin-bg-media-form");
  const mediaFile = document.getElementById("admin-bg-media-image");
  const sponsorsForm = document.getElementById("admin-bg-sponsors-form");
  const sponsorsFile = document.getElementById("admin-bg-sponsors-image");
  const socialForm = document.getElementById("admin-bg-social-form");
  const socialFile = document.getElementById("admin-bg-social-image");
  const heroColorInput = document.getElementById("admin-hero-color");
  const siteColorInput = document.getElementById("admin-site-bg-color");
  const matchesColor = document.getElementById("admin-bg-matches-color");
  const trainingColor = document.getElementById("admin-bg-training-color");
  const coachesColor = document.getElementById("admin-bg-coaches-color");
  const playersColor = document.getElementById("admin-bg-players-color");
  const mediaColor = document.getElementById("admin-bg-media-color");
  const sponsorsColor = document.getElementById("admin-bg-sponsors-color");
  const socialColor = document.getElementById("admin-bg-social-color");

  if (heroForm && heroFileInput && heroColorInput) {
    heroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const file = heroFileInput.files && heroFileInput.files[0];
      const color = heroColorInput.value;
      if (!file && !color) return;

      const saveColor = () => {
        if (color) {
          appState.heroBackgroundColor = color;
          appState.heroBackground = null;
          saveAppState();
          renderHeroBackground();
          heroForm.reset();
          if (statusEl) {
            statusEl.textContent = "Hero background color saved.";
          }
        }
      };

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          appState.heroBackground = reader.result;
          appState.heroBackgroundColor = null;
          saveAppState();
          renderHeroBackground();
          heroForm.reset();
          if (statusEl) {
            statusEl.textContent = "Hero background image saved. It will stay after you reload the page.";
          }
        };
        reader.readAsDataURL(file);
      } else {
        saveColor();
      }
    });
  }

  if (siteForm && siteFileInput && siteColorInput) {
    siteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const file = siteFileInput.files && siteFileInput.files[0];
      const color = siteColorInput.value;
      if (!file && !color) return;

      const saveColor = () => {
        if (color) {
          appState.siteBackgroundColor = color;
          appState.siteBackground = null;
          saveAppState();
          renderSiteBackground();
          siteForm.reset();
          if (statusEl) {
            statusEl.textContent = "Site background color saved.";
          }
        }
      };

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          appState.siteBackground = reader.result;
          appState.siteBackgroundColor = null;
          saveAppState();
          renderSiteBackground();
          siteForm.reset();
          if (statusEl) {
            statusEl.textContent = "Site background image saved. It will stay after you reload the page.";
          }
        };
        reader.readAsDataURL(file);
      } else {
        saveColor();
      }
    });
  }

  const bindSectionBg = (form, fileInput, colorInput, key, label) => {
    if (!form || !fileInput || !colorInput) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const file = fileInput.files && fileInput.files[0];
      const color = colorInput.value;
      if (!file && !color) return;

      const saveColor = () => {
        if (color) {
          appState.sectionBackgrounds = {
            ...appState.sectionBackgrounds,
            [key]: null,
          };
          appState.sectionBackgroundColors = {
            ...appState.sectionBackgroundColors,
            [key]: color,
          };
          saveAppState();
          renderSectionBackgrounds();
          form.reset();
          if (statusEl) {
            statusEl.textContent = `${label} background color saved.`;
          }
        }
      };

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          appState.sectionBackgrounds = {
            ...appState.sectionBackgrounds,
            [key]: reader.result,
          };
          appState.sectionBackgroundColors = {
            ...appState.sectionBackgroundColors,
            [key]: null,
          };
          saveAppState();
          renderSectionBackgrounds();
          form.reset();
          if (statusEl) {
            statusEl.textContent = `${label} background image saved. It will stay after you reload the page.`;
          }
        };
        reader.readAsDataURL(file);
      } else {
        saveColor();
      }
    });
  };

  bindSectionBg(matchesForm, matchesFile, matchesColor, "matches", "Matches section");
  bindSectionBg(trainingForm, trainingFile, trainingColor, "training", "Training section");
  bindSectionBg(coachesForm, coachesFile, coachesColor, "coaches", "Coaching staff section");
  bindSectionBg(playersForm, playersFile, playersColor, "players", "First team squad section");
  bindSectionBg(mediaForm, mediaFile, mediaColor, "media", "Team media section");
  bindSectionBg(sponsorsForm, sponsorsFile, sponsorsColor, "sponsors", "Club sponsors section");
  bindSectionBg(socialForm, socialFile, socialColor, "social", "Follow the team section");
}

function setupAdminIdentity() {
  const form = document.getElementById("admin-identity-form");
  const nameInput = document.getElementById("admin-club-name");
  const taglineInput = document.getElementById("admin-club-tagline");

  if (!form || !nameInput || !taglineInput) return;

  // Pre-fill with current values
  nameInput.value = appState.clubName || "Your Football Club";
  taglineInput.value =
    appState.clubTagline || "Official hub for news, fixtures, results & squad.";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim() || "Your Football Club";
    const tagline =
      taglineInput.value.trim() ||
      "Official hub for news, fixtures, results & squad.";

    appState.clubName = name;
    appState.clubTagline = tagline;
    saveAppState();
    renderHeroText();
  });
}

function setupAdminAds() {
  const form = document.getElementById("admin-ads-form");
  const inlinePlayersInput = document.getElementById("admin-ad-inline-players");
  const inlinePlayersMediaInput = document.getElementById("admin-ad-inline-players-media");
  const bottomMainInput = document.getElementById("admin-ad-bottom-main");

  if (!form || !inlinePlayersInput || !inlinePlayersMediaInput || !bottomMainInput) return;

  const ads = appState.ads || {
    inlinePlayers: "",
    inlinePlayersMedia: "",
    bottomMain: "",
  };

  inlinePlayersInput.value = ads.inlinePlayers || "";
  inlinePlayersMediaInput.value = ads.inlinePlayersMedia || "";
  bottomMainInput.value = ads.bottomMain || "";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    appState.ads = {
      inlinePlayers: inlinePlayersInput.value.trim(),
      inlinePlayersMedia: inlinePlayersMediaInput.value.trim(),
      bottomMain: bottomMainInput.value.trim(),
    };

    saveAppState();
    renderAds();
  });
}

