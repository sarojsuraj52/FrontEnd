import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import MoviesForm from "./components/MoviesForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let response = await fetch(
        "https://react-https-test-9c413-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }

      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      // const trasformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  async function addMoviesHandler(movie) {
    const response = await fetch(
      "https://react-https-test-9c413-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    fetchMovieHandler()
  }

  const deleteMovieHandler = async (movieId) => {
    const response = await fetch(`https://react-https-test-9c413-default-rtdb.firebaseio.com/movies/${movieId}.json`,
      { method: "DELETE" });

    const data = await response.json();
    console.log(data);
    console.log("hello");
    fetchMovieHandler();
  };

  // async function deleteMovieHandler(movieId){
  // const response = await fetch("https://react-https-test-9c413-default-rtdb.firebaseio.com/movies/-N3G5kvKMFLRCLaTX4AZ.json",{
  //   method: 'DELETE',
  // })

  // const data = await response.json()
  // console.log(data)
  // console.log('hello')
  // fetchMovieHandler()
  // console.log(movieId)
  // }

  let content = <p>No Movies Found</p>;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && movies.length > 0) {
    content = <MoviesList onDelete={deleteMovieHandler} movies={movies} />;
  }
  if (!isLoading && error) {
    content = <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <section>
        <MoviesForm onAddMovies={addMoviesHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
