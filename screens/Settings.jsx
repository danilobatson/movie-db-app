import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'


import {
  colors,
  containerStyles,
  fontWeights,
  sizes,
  textStyles
} from '../lib/styles'

import { API_KEY } from '../lib/constants'
import { SortOption, Genre } from '../components'
import { useFetch } from '../hooks/'

export default function Settings({ navigation }) {
  const insets = useSafeAreaInsets()

  const [sortSelection, setSortSelection] = useState('Popularity')
  const [sortQuery, setSortQuery] = useState('popularity.desc')

  const genres = useRef([])

  //Fetch genres
  const fetch = useFetch(`genre/movie/list`)
  if (fetch.data) {
    genres.current = fetch.data.genres
  }

  const [genreSelection, setGenreSelection] = useState([''])
  const [genreQuery, setGenreQuery] = useState([])

  const [runtime, setRuntime] = useState({ from: null, to: null })
  const [disable, setDisable] = useState(false)

  const year = useRef(null)


// Allows limits on runtime 
  const minandMaxRuntime = () => {
    if (Number(runtime.to) < Number(runtime.from)) {
      setRuntime((prevState) => ({
        ...prevState,
        to: null
      }))
      setDisable(true)
    } else {
      setDisable(false)
    }
  }

  // Returns query for sorting
  const setSortingOptions = (name) => {
    setSortSelection(name)
    switch (name) {
      case 'Popularity':
        setSortQuery('popularity.desc')
        break
      case 'Rating':
        setSortQuery('vote_average.desc')
        break
      case 'Newest First':
        setSortQuery('release_date.desc')
        break
      case 'Oldest First':
        setSortQuery('release_date.asc')
        break
      default:
        setSortQuery('popularity.desc')
    }
  }

  //Genre selection filter
  const choseGenres = (name) => {
    if (genreSelection.includes(name)) {
      setGenreSelection(genreSelection.filter((genre) => genre !== name))
    } else {
      setGenreSelection([...genreSelection, name])
    }
  }

  //Generates genre id 
  const setGenreId = (id) => {
    setGenreQuery((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((genre) => genre !== id)
      }
      return [...prevState, id]
    })
  }

  const setGenreOptions = (name) => {
    choseGenres(name)
    const id = genres.current.find((genre) => genre.name === name).id.toString()
    setGenreId(id)
  }

  // Creates sorting options iterator 
  const sortOptions = ['Popularity', 'Rating', 'Newest First', 'Oldest First']

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
          <Text style={textStyles.h2}>Sort by</Text>
          <View>
            {sortOptions.map((option) => (
              <SortOption
                key={option}
                name={option}
                selected={sortSelection}
                onSelect={() => {
                  setSortingOptions(option)
                }}
              />
            ))}
          </View>
        </View>
        <View>
          <Text style={textStyles.h2}>Genres</Text>
          <View style={styles.genreList}>
            {genres.current.map((genre) => (
              <Genre
                key={genre.id}
                name={genre.name}
                selected={genreSelection}
                onSelect={() => {
                  setGenreOptions(genre.name)
                }}
              />
            ))}
          </View>
        </View>
        <View>
          <Text style={textStyles.h2}>Year</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            maxLength={4}
            inputMode="numeric"
            value={year.current}
            onChangeText={(text) => {
              year.current = text
            }}
          />
        </View>
        <View>
          <Text style={textStyles.h2}>Runtime</Text>
          <View style={styles.runtime}>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              placeholder="From"
              placeholderTextColor={colors.neutral}
              maxLength={3}
              inputMode="numeric"
              value={runtime.from}
              onBlur={() => {
                minandMaxRuntime()
              }}
              onChangeText={(text) => {
                setRuntime((prevState) => ({
                  ...prevState,
                  from: text
                }))
              }}
            />
            <Text style={textStyles.small}>-</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              placeholder="To"
              placeholderTextColor={colors.neutral}
              maxLength={3}
              inputMode="numeric"
              value={runtime.to}
              onBlur={() => {
                minandMaxRuntime()
              }}
              onChangeText={(text) => {
                setRuntime((prevState) => ({
                  ...prevState,
                  to: text
                }))
              }}
            />
            <Text style={textStyles.small}>minutes</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          underlayColor={colors.neutral}
          style={styles.button}
          onPress={() => {
            navigation.navigate('Discover', {
              sortQuery,
              genreQuery,
              year: year.current,
              runtime
            })
          }}
          disabled={disable}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    gap: 30
  },
  input: {
    backgroundColor: colors.light,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
    width: 80
  },
  genreList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  genre: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  selectedGenre: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  selectedGenreText: {
    color: colors.white
  },
  runtime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  buttonContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.light,
    paddingVertical: 16,
    paddingHorizontal: 30
  },
  button: {
    backgroundColor: colors.black,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center'
  },
  buttonText: {
    color: colors.white,
    fontWeight: fontWeights.bold,
    fontSize: sizes.md
  }
})
