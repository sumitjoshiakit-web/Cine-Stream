const BASE = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

async function request(path, signal) {
  if (!TOKEN) {
    throw new Error("TMDB API token is missing. Add VITE_TMDB_API_TOKEN.");
  }

  const response = await fetch(BASE + path, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(
      response.status === 429
        ? "TMDB rate limit reached."
        : `TMDB request failed (${response.status}).`
    );
  }

  return response.json();
}

export const imageUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

export const popular = (page, signal) =>
  request(`/movie/popular?language=en-US&page=${page}`, signal);

export const search = (query, page, signal) =>
  request(
    `/search/movie?language=en-US&include_adult=false&page=${page}&query=${encodeURIComponent(query)}`,
    signal
  );
