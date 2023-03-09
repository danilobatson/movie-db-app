import { View } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { EmptyState, FullState, FavoritesState } from '../components'
import { containerStyles } from '../lib/styles'
import { API_KEY } from '../lib/constants'

import { getMovies } from '../helpers'
import { useFetch } from '../hooks/'


export default function Discover({ navigation, route }) {


  const genres = useRef([])
  const config = useRef('')
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const favorite = useSelector((state) => state.movie.favorite)

  // Fetches genres
  const fetchGenres = useFetch(`genre/movie/list`)
  if (fetchGenres.data) {
    genres.current = fetchGenres.data.genres
  }

// Fetches config
  const fetchConfig = useFetch(`configuration`)
  if (fetchConfig.data) {
    config.current = `${fetchConfig.data.images.secure_base_url}${fetchConfig.data.images.poster_sizes[5]}`
  }

// Creates array of genres 
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
  }, [page, route.params])

  let image = config.current
  return (
    <View style={containerStyles}>
      {/* {movies.length > 0 && (
        <EmptyState
          image={require('../assets/empty-favorites.jpg')}
          title="You haven't liked any movie yet"
          message="Why not try to find a movie you like?"
          actionLabel="Go to Discover"
          onAction={() => navigation.navigate('Discover')}
        />
      )} */}

      {favorite.length > 0 && (
        <FavoritesState
          favorite={favorite}
          config={image}
          onAction={(id, title, genres) =>
            navigation.navigate('Details', {
              id,
              title,
              image,
              genres: genresList(genres)
            })
          }
        />
      )}
    </View>
  )
}
