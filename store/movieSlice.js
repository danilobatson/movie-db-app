import { createSlice } from '@reduxjs/toolkit'

//Creates initial state
const initialState = {
  favorite: []
}

//Creates slice
export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addFavorites: (state, action) => {
      state.favorite.push(action.payload)
    },
    removeFavorites: (state, action) => {
      const newState = state.favorite.filter((fav) => fav.id !== action.payload)
      if (!newState) {
        state.favorite = []
      } else {
        state.favorite = newState
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addFavorites, removeFavorites } = movieSlice.actions

export default movieSlice.reducer
