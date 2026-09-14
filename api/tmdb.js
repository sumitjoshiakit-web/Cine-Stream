const BASE = "https://api.themoviedb.org/3";

export default async function handler(req, res) {
  const token = process.env.TMDB_API_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "TMDB API token is missing. Add TMDB_API_TOKEN in Vercel.",
    });
  }

  const path = req.query?.path;

  if (!path || typeof path !== "string" || !path.startsWith("/")) {
    return res.status(400).json({ error: "Invalid TMDB API path." });
  }

  try {
    const response = await fetch(BASE + path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "TMDB request failed." });
  }
}
