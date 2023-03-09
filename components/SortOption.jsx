import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons'

import { colors, sizes } from '../lib/styles'

const SortOption = ({ name, selected, onSelect }) => {
  return (
    <TouchableOpacity
      style={styles.sortOption}
      activeOpacity={0.7}
      onPress={onSelect}
    >
      <Text>{name}</Text>
      <Icon
        name={selected === name ? 'checkmark-circle' : 'ellipse-outline'}
        size={sizes.xxl}
        color={selected === name ? colors.primary : colors.black}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: colors.light,
    borderBottomWidth: 1
  }
})

export default SortOption
