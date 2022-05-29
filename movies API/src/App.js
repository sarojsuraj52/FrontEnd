import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  async function fetchMovieHandler(){
    setIsLoading(true)
    const response = await fetch('https://swapi.dev/api/films')
    const data = await response.json()
    
      const trasformedMovies = data.results.map(movieData=>{
        return {
          id: movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date
        }
      })
      setMovies(trasformedMovies) 
      setIsLoading(false)
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length === 0 && <p>No movies found</p>}
        {isLoading ? 'Loading Please Wait...': <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
