import Icon from 'react-native-vector-icons/Ionicons'
import { StyleSheet } from 'react-native'

import { colors, sizes } from '../lib/styles'

//Get the correct number of stars for rating
export const getStars = (num) => {
  if (num) {

    const filledStarsCount = Math.round(Number(num) / 2)
    const emptyStarsCount = 5 - filledStarsCount

    //Create array to map over related to star count
    const filledArray = new Array(filledStarsCount).fill(0)
    const emptyArray = new Array(emptyStarsCount).fill(0)

    //Number of filled stars to render
    const filledIcons = filledArray.map((item, idx) => (
      <Icon
        name="star"
        size={sizes.xl}
        color={colors.primary}
        style={styles.star}
        key={idx}
      />
    ))

    //Number of empty stars to render
    const emptyIcons = emptyArray.map((item, idx) => (
      <Icon
        name="star-outline"
        size={sizes.xl}
        color={colors.primary}
        style={styles.star}
        key={idx}
      />
    ))

    //Return array of filled and empty stars
    filledIcons.push(emptyIcons)
    return filledIcons
  }
}

const styles = StyleSheet.create({
  star: {
    marginRight: 5
  }
})
