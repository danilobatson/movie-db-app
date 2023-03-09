import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'

import { colors, sizes, fontWeights } from '../lib/styles'

import { useEffect } from 'react'
import { getStars } from '../helpers'

export default function FavoritesState({ onAction,  config, favorite }) {



  return (
    <View style={styles.container}>
      <FlatList
        data={favorite}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => onAction(item.id, item.title, item.genre_ids)}
          >
            <View style={styles.movie}>
              <Image
                source={{
                  uri: `${item.image}`
                }}
                style={styles.image}
              />
              <Text style={styles.title}>{item.title}</Text>
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
    width: 200,
    alignSelf: 'center'
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
    flexDirection: 'column'
  },
  button: {
    paddingBottom: 30
  }
})
