import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import { colors, sizes } from '../lib/styles'

const Genre = ({ name, selected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[
        styles.genre,
        selected.includes(name) ? styles.selectedGenre : null
      ]}
      activeOpacity={0.7}
      onPress={onSelect}
    >
      <Text style={[selected.includes(name) ? styles.selectedGenreText : null]}>
        {name}
      </Text>
      {selected && (
        <Icon name="close-outline" size={sizes.lg} color={colors.white} />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
  }
})

export default Genre
