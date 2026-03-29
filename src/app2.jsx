import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import Loading from "./components/loading";

import Logo from "./components/logo";
import SearchForm from "./components/serachForm";
import WatchListButton from "./components/watchListButton";
import MovieDetails from "./components/movieDetails";

import MovieList from "./components/movieList";
import WatchList from "./components/watchList";

import { movie_List } from "./data";
import { use, useEffect, useState } from "react";
import ErrorMessage from "./components/errorMessage";

const api_key = "ae1af8842aafba205986d60ed16d5f43";
const page = 1;
const query = "batman";
const language = "tr-Tr";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watches, setWatches] = useState([]);
  const [isWatchListOpen, setisWatchListOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}&page=${page}&language=${language}`
        );
        if (!response.ok) {
          throw new Error("Hata oluştu.");
        }
        const data = await response.json();
        if (data.results) {
          const filtered_data = data.results.filter(
            (movie) => movie.poster_path != null
          );

          setMovies(filtered_data);
        }
        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }
    if (searchQuery.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    getMovies();

    // fetch(
    //   `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}&language=${language}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setMovies(data.results);
    //   });
  }, [searchQuery]);

  function handleAddTheWatchList(movie) {
    const isAddedToList = watches.map((m) => m.id).includes(movie.id);
    if (!isAddedToList) {
      setWatches((movies) => [...movies, movie]);
    }
  }
  function handleRemoveFromTheWatchList(movie) {
    setWatches((movies) => movies.filter((i) => i.id != movie.id));
  }
  function handleSelectedMovie(movie) {
    setSelectedMovie(movie);
    window.scrollTo(0, 0);
  }
  return (
    <>
      <Header>
        <Logo />
        <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <WatchListButton
          watches={watches}
          setisWatchListOpen={setisWatchListOpen}
        />
      </Header>
      <Main>
        {selectedMovie && (
          <MovieDetails
            movieObj={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
        <WatchList
          watches={watches}
          isWatchListOpen={isWatchListOpen}
          onRemoveList={handleRemoveFromTheWatchList}
          onHanleSelectedMovie={setSelectedMovie}
        />
        {loading && <Loading />}
        {!loading && !error && (
          <MovieList
            movies={movies}
            onAddToList={handleAddTheWatchList}
            onHanleSelectedMovie={handleSelectedMovie}
          />
        )}
        {!loading && error && <ErrorMessage message={error} />}
      </Main>
      <Footer />
    </>
  );
}
