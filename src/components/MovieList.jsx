import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);

  return (
    <div className="w-full px-4 my-6">
      <h2 className="text-white text-xl font-semibold mb-3">{title}</h2>

      <div className="flex overflow-x-scroll">
        <div className="flex gap-3">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
