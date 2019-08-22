import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import SavedList from './Movies/SavedList'
import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie'
import UpdateMovieForm from './Movies/UpdateMovieForm'

const App = () => {
  const [savedList, setSavedList] = useState([])
  const [movies, setMovies] = useState([])
  // console.log('app movies', movies)
  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie])
  }

  const updateMovieList = (movie) => {
    // console.log('updatemovielist', movie)
    setMovies([...movies, movie])
    // console.log('updatemovielist new state', movies)
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route
        exact
        path='/'
        render={(props) => <MovieList {...props} setMovies={setMovies} />}
      />
      <Route
        path='/movies/:id'
        render={(props) => {
          return <Movie {...props} addToSavedList={addToSavedList} />
        }}
      />
      <Route
        path='/update-movie/:id'
        render={(props) => (
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
