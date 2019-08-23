import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const UpdateMovieForm = (props) => {
  const [movie, setMovie] = useState(initialMovie)

  console.log('movie', movie)

  useEffect(() => {
    const id = props.match.params.id
    const movieToUpdate = props.movies.find((mov) => `${mov.id}` === id)
    if (movieToUpdate) setMovie(movieToUpdate)
  }, [props.movies, props.match.params.id])

  const changeHandler = (ev) => {
    ev.persist()
    let value = ev.target.value
    if (ev.target.name === 'metascore') {
      value = parseInt(value, 10)
    }

    setMovie({
      ...movie,
      [ev.target.name]: value
    })
  }
  const handleStar = (i) => (e) => {
    setMovie({
      ...movie,
      stars: movie.stars.map((star, starIndex) =>
        starIndex === i ? e.target.value : star
      )
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then((res) => {
        setMovie(initialMovie)
        props.updateMovieList(res.data)
        props.history.push(`/movies/${movie.id}`)
      })
      .catch((err) => {
        if (err.response.status === 422) props.history.push('/')
        console.log(err.response)
      })
  }

  return (
    <div>
      <h2>Update Movie Info</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          onChange={changeHandler}
          placeholder='Title'
          value={movie.title}
        />
        <div className='baseline' />

        <input
          type='text'
          name='director'
          onChange={changeHandler}
          placeholder='Director'
          value={movie.director}
        />
        <div className='baseline' />

        <input
          type='number'
          name='metascore'
          onChange={changeHandler}
          placeholder='Metascore'
          value={movie.metascore}
        />
        <div className='baseline' />
        {movie.stars.map((star, i) => {
          console.log('stars map', star)
          return <input
            type='string'
            name='stars'
            onChange={handleStar(i)}
            placeholder='Star'
            value={star}
          />
        })}
        <div className='baseline' />

        <button className='md-button form-button'>Update</button>
      </form>
    </div>
  )
}

export default UpdateMovieForm
