import { Image, StyleSheet, Text, TouchableOpacity, Icon } from 'react-native'

import { colors, sizes, fontWeights } from '../lib/styles'
import { useDispatch, useSelector } from 'react-redux'

export default function FavoritesButton({ navigation, route }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => console.log(route)}>
      <Icon name="heart-outline" size={sizes.xxl} color={colors.black} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 200,
    marginBottom: 10
  },
  title: {
    fontSize: sizes.xl,
    color: colors.black,
    fontWeight: fontWeights.bold,
    marginBottom: 0
  },
  message: {
    marginTop: 0,
    fontSize: sizes.md,
    color: colors.neutral,
    marginBottom: 14
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 10
  },
  button: {
    backgroundColor: colors.black,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 16
  },
  buttonText: {
    color: colors.white,
    fontSize: sizes.md,
    fontWeight: fontWeights.bold
  }
})
