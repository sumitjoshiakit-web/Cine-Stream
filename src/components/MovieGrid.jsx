import MovieCard from "./MovieCard.jsx";

export default function MovieGrid({ movies, favorites, onToggle }) {
  return movies.length ? (
    <div className="grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          favorite={favorites.some((favorite) => favorite.id === movie.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  ) : (
    <div className="empty">
      <h2>No movies found</h2>
      <p>Try another search.</p>
    </div>
  );
}
