import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  FlatList
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import { POSTER_ASPECT_RATIO, API_KEY } from '../lib/constants'
import { textStyles, containerStyles, sizes, colors } from '../lib/styles'

import { useFetch, useFetchCredit } from '../hooks/'
import { getStars } from '../helpers'

import { addFavorites, removeFavorites } from '../store/movieSlice'


const screenDimensions = Dimensions.get('screen')
const horizontalPadding = 30

const imageHorizontalMargin = 20
const imageWidth =
  screenDimensions.width - horizontalPadding * 2 - imageHorizontalMargin * 2

export default function Details({ navigation, route }) {
  const { id, title, image, genres } = route.params

 //Creates ref
  const movie = useRef([])
  const credit = useRef([])

  //Fetch movie details by id
  const fetch = useFetch(`/movie/${id}}`)
  if (fetch.data) {
    movie.current = fetch.data
  }
  //Fetch movie credits by id, used for cast 
  const fetchCredit = useFetchCredit(id)
  if (fetchCredit.data) {
    credit.current = fetchCredit.data
  }

  const insets = useSafeAreaInsets()

  //Converts runtime to hours and minutes
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours}h ${minutes}m`
  }

  //Returns null if movie details are not fetched yet
  if (!movie.current) {
    return null
  }

  let release_date = ''
  let profile_path = ''
  let genre_ids = []
  if (movie.current.release_date) {
    genre_ids = movie.current.genres.map((genre) => genre.id)
    release_date = movie.current.release_date.slice(0, 4)
  }
  const { poster_path, overview, runtime } = movie.current

  if (credit.current.cast) {
    profile_path = credit.current.cast[0].profile_path
  }


  return (
    <View
      style={[
        containerStyles,
        {
          paddingBottom: insets.bottom
        }
      ]}
    >
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View>
          <Image
            source={{
              uri: `${image}${poster_path}`
            }}
            style={styles.image}
          />
          <View style={styles.rating}>
            {getStars(movie.current.vote_average)}
          </View>

          <Text style={[textStyles.small, styles.info]}>
            {release_date.slice(0, 4)} • {genres} • {toHoursAndMinutes(runtime)}
          </Text>
        </View>
        <View>
          <Text style={textStyles.h2}>Overview</Text>
          <Text style={textStyles.paragraph}>{overview}</Text>
        </View>
        <View>
          <Text style={textStyles.h2}>Cast</Text>
          <FlatList
            data={credit.current.cast}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={{
                    uri: `${image}${item.profile_path}`
                  }}
                  style={styles.castImage}
                />
                <Text style={styles.name}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 30,
    paddingHorizontal: horizontalPadding,
    gap: 30
  },
  image: {
    height: imageWidth / POSTER_ASPECT_RATIO,
    width: imageWidth,
    backgroundColor: 'lightgray',
    borderRadius: 350 / 10,
    marginHorizontal: imageHorizontalMargin,
    marginBottom: 20
  },
  info: {
    textAlign: 'center'
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  castImage: {
    height: 100,
    width: 100,
    backgroundColor: 'lightgray',
    borderRadius: 70,
    marginHorizontal: 10,
    marginBottom: 10
  },
  name: {
    marginLeft: 15,
    fontSize: sizes.md,
    color: colors.neutral
  }
})
