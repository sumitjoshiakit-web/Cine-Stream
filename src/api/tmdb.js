const BASE = "/api/tmdb";

async function request(path, signal) {
  const response = await fetch(`${BASE}?path=${encodeURIComponent(path)}`, {
    signal,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));

    throw new Error(
      response.status === 429
        ? "TMDB rate limit reached."
        : data.error || `TMDB request failed (${response.status}).`
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
