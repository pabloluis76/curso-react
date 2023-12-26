import './App.css'
import { useMovies } from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import { useEffect, useState, useRef } from 'react'


function useSearch() {
  const [search, updateSerch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar solo numeros')
      return
    }

    if (search.length < 3) {
      setError('Por favor ingrese mas de 3 caracteres')
      return
    }

    setError(null)
  }, [search])
  return { search, updateSerch, error }
}

function App() {
  const { search, updateSerch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search })


  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) => {
    updateSerch(event.target.value)
  }

  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de Peliculas</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input
              style={{
                border: '1px solid transparent',
                borderColor: error ? 'red' : 'transparent'
              }} onChange={handleChange} value={search} name='query' placeholder='Avangers, StartWars, The Matrix' />
            <button type='submit'>Search</button>
          </form>
          {error && <p style={{ color: 'red' }} >{error}</p>}
        </header>

        <main>
          {
            loading ? <p>Loanding...</p> : <Movies movies={movies} />
          }
        </main>
      </div>
    </>
  )
}

export default App
