import { useEffect, useState } from "react";
import MoviesCard from "./MoviesCard";
import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com/?apikey=6fb13db&";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search a movie"
        />

        <img
          src={SearchIcon}
          onClick={() => searchMovies(searchTerm)}
          alt="search"
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MoviesCard movie={movie}></MoviesCard>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
