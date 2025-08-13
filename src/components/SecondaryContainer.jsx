import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const nowPlaying = useSelector((store) => store.movies?.nowPlayingMovies);
  const popular = useSelector((store) => store.movies?.popularMovies);
  const topRated = useSelector((store) => store.movies?.topRatedMovies);
  const upcoming = useSelector((store) => store.movies?.upcomingMovies);

  if (!nowPlaying && !popular && !topRated && !upcoming) return null;

  return (
    <div className="bg-black pb-16">
      {/* 
        MovieList - Now Playing
            - MovieCard * n
        MovieList - Popular  
        MovieList - Top Rated"
        MovieList - Upcoming
    */}
      <div className="-mt-52 pl-12 relative z-20">
        <MovieList title="Now Playing" movies={nowPlaying} />
        <MovieList title="Top Rated" movies={topRated} />
        <MovieList title="Popular" movies={popular} />
        <MovieList title="Upcoming" movies={upcoming} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
