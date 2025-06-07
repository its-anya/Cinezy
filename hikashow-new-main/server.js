const express = require("express");
const fetch = require("node-fetch"); // For Node < 18; in Node 18+ you can use global fetch.
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// TMDB Proxy + API Key
const API_KEY = "df0daedd7538a65a227659c13a67d152";
const BASE_URL = "https://tmdbapi.sakshamchugh.com/3";

// Set up EJS templating engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serve static assets
app.use(express.static(path.join(__dirname, "public")));

/**
 * Home Route – Fetch trending, now playing, popular, and top rated movies.
 * All endpoints are filtered for Indian movies.
 */
app.get("/", async (req, res) => {
  try {
    const trendingRes = fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&with_origin_country=IN`);
    const nowPlayingRes = fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&region=IN&with_origin_country=IN`);
    const popularRes = fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&region=IN&with_origin_country=IN`);
    const topRatedRes = fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&region=IN&with_origin_country=IN`);
    
    const responses = await Promise.all([trendingRes, nowPlayingRes, popularRes, topRatedRes]);
    const data = await Promise.all(responses.map(response => response.json()));
    
    const trendingMovies = data[0].results || [];
    const nowPlayingMovies = data[1].results || [];
    const popularMovies = data[2].results || [];
    const topRatedMovies = data[3].results || [];
    
    res.render("index", { trendingMovies, nowPlayingMovies, popularMovies, topRatedMovies });
  } catch (error) {
    console.error("Error fetching home data:", error);
    res.status(500).send("Server Error: Unable to fetch data");
  }
});

/**
 * API Search Route – Uses TMDB multi-search to return movies and TV shows.
 */
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.query || "";
    if (!query) return res.json({ results: [] });
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    const results = data.results || [];
    res.json({ results });
  } catch (error) {
    console.error("Error in /api/search:", error);
    res.status(500).json({ results: [] });
  }
});

/**
 * Details Route – Fetch detailed info (with credits, external_ids, videos, reviews) for a movie or TV show.
 */
app.get("/details/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    if (!["movie", "tv"].includes(type))
      return res.status(400).send("Invalid type. Must be 'movie' or 'tv'.");
    const url = `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=credits,external_ids,videos,reviews`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.success === false) return res.status(404).send("Not found");
    res.render("details", { type, details: data });
  } catch (error) {
    console.error("Error fetching details:", error);
    res.status(500).send("Server Error: Unable to fetch details");
  }
});

/**
 * Watch Route – A separate page to watch the movie/series.
 * Also fetches similar movies/TV shows (filtered for Indian movies).
 */
app.get("/watch/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    if (!["movie", "tv"].includes(type))
      return res.status(400).send("Invalid type. Must be 'movie' or 'tv'.");
    const url = `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=external_ids`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.success === false) return res.status(404).send("Not found");

    let similarUrl = "";
    if (type === "movie") {
      similarUrl = `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&region=IN&with_origin_country=IN`;
    } else {
      similarUrl = `${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&region=IN`;
    }
    const similarRes = await fetch(similarUrl);
    const similarData = await similarRes.json();
    const similarMovies = similarData.results || [];

    res.render("watch", { type, details: data, similarMovies });
  } catch (error) {
    console.error("Error fetching watch data:", error);
    res.status(500).send("Server Error: Unable to fetch watch details");
  }
});

/**
 * Watchlist Route – Renders the watchlist page.
 */
app.get("/watchlist", (req, res) => {
  res.render("watchlist");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
