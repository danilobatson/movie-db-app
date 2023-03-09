import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'

import { colors, sizes, fontWeights, textStyles } from '../lib/styles'

import { getStars } from '../helpers'

export default function FullState({
  onAction,
  movies,
  config,
  genres,
  page,
  setPage,
  genresList
}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() =>
              onAction(
                item.id,
                item.title,
                config,
                item.poster_path,
                item.genre_ids,
                item.genre_ids
              )
            }
          >
            <View style={styles.movie}>
              <Image
                source={{
                  uri: `${config}${item.poster_path}`
                }}
                style={styles.image}
              />
              <View style={styles.description}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.rating}>{getStars(item.vote_average)}</View>
                <Text style={textStyles.paragraph}>
                  {genresList(item.genre_ids)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 275,
    width: 200,
    marginBottom: 10,
    borderRadius: 30,
    marginHorizontal: 10,
    objectFit: 'fill'
  },
  title: {
    fontSize: sizes.xl,
    color: colors.black,
    fontWeight: fontWeights.normal,
    marginBottom: 0
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 10,
    marginHorizontal: 10,
    marginVertical: 20
  },
  movie: {
    flexDirection: 'row'
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingBottom: 150
  },
  rating: {
    display: 'flex',
    flexDirection: 'row'
  }
})
