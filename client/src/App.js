import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import SavedList from './Movies/SavedList'
import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie'
import UpdateMovieForm from './Movies/UpdateMovieForm'

const App = () => {
  const [savedList, setSavedList] = useState([])
  const [movies, setMovies] = useState([])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie])
  }

  const updateMovieList = movie => {
    setMovies([...movies, movie])
  }

  const removeMovie = movieId => {
    const newList = movies.filter(movie => movie.id !== movieId)
    setMovies(newList)
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route
        exact
        path="/"
        render={props => <MovieList {...props} setMovies={setMovies} />}
      />
      <Route
        path="/movies/:id"
        render={props => (
          <Movie
            {...props}
            removeMovie={removeMovie}
            addToSavedList={addToSavedList}
          />
        )}
      />
      <Route
        path="/update-movie/:id"
        render={props => (
          <UpdateMovieForm
            {...props}
            movies={movies}
            updateMovieList={updateMovieList}
          />
        )}
      />
    </>
  )
}

export default App
