import { View } from 'react-native'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { containerStyles } from '../lib/styles'
import { API_KEY } from '../lib/constants'

import { EmptyState, FullState } from '../components'
import { getMovies } from '../helpers'
import { useFetch } from '../hooks/'

export default function Discover({ navigation, route }) {
  //Initializes ref and states
  const genres = useRef([])
  const config = useRef('')
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)

  const fav = useSelector((state) => state.movie.favorite)

  //Fetch genres
  const fetchGenres = useFetch(`genre/movie/list`)
  if (fetchGenres.data) {
    genres.current = fetchGenres.data.genres
  }

  //Fetch config
  const fetchConfig = useFetch(`configuration`)
  if (fetchConfig.data) {
    config.current = `${fetchConfig.data.images.secure_base_url}${fetchConfig.data.images.poster_sizes[5]}`
  }

  //Fetch movies
  const getMovies = async () => {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
    if (route.params) {
      let sortQuery = ''
      let genreQuery = ''
      let runtimeTo = ''
      let runtimeFrom = ''
      let year = ''
      if (route.params.sortQuery) {
        sortQuery = route.params.sortQuery
      }
      if (route.params.genreQuery.length > 0) {
        genreQuery = route.params.genreQuery.join()
      }
      if (
        route.params.runtime.to !== null ||
        route.params.runtime.from !== null
      ) {
        if (route.params.runtime.to !== null) {
          runtimeTo = route.params.runtime.to
        }
        if (route.params.runtime.from !== null) {
          runtimeFrom = route.params.runtime.from
        }
      }
      if (route.params.year !== null) {
        year = route.params.year
      }

      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sortQuery}&page=${page}&primary_release_year=${year}&with_genres=${genreQuery}&with_runtime.gte=${runtimeFrom}&with_runtime.lte=${runtimeTo}`
    }
    try {
      const response = await axios.get(url)
      const data = await response.data.results
      //Used for pagination
      page === 1 ? setMovies(data) : setMovies([...movies, ...data])
    } catch (error) {
      console.log(error)
    }
  }

  //Creates array of genres
  const genresList = (genreIds) => {
    const genreNames = genreIds.map((id) => {
      const genre = genres.current.find((genre) => genre.id === id)
      if (genre.name) {
        return genre.name
      }
    })
    return genreNames.join(', ')
  }

  useEffect(() => {
    getMovies()
  }, [page, route.params])

  let image = config.current
  return (
    <View style={containerStyles}>
      {movies.length === 0 && (
        <EmptyState
          image={require('../assets/empty-discover.jpg')}
          title="No results found"
          message="Try adjusting the settings"
          actionLabel="Go to Settings"
          onAction={() => navigation.navigate('Settings')}
        />
      )}

      {movies.length > 0 && (
        <FullState
          movies={movies}
          config={image}
          genres={genres}
          page={page}
          setPage={setPage}
          genresList={genresList}
          onAction={(id, title, config, poster_path, genre_ids, genres) =>
            navigation.navigate('Details', {
              id,
              title,
              image,
              poster_path,
              genre_ids,
              genres: genresList(genres)
            })
          }
        />
      )}
    </View>
  )
}
