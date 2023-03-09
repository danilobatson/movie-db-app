import { StyleSheet, TouchableOpacity, } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import  store  from './store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import { Details, Favorites, Discover, Settings } from './screens'

import { addFavorites, removeFavorites } from './store/movieSlice'
import { colors, sizes } from './lib/styles'

let persistor = persistStore(store)

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const tabOptions = ({ route }) => ({
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.neutral,
  tabBarIcon: ({ focused, color }) => {
    let iconName
    switch (route.name) {
      case 'Home':
        focused ? (iconName = 'home') : (iconName = 'home-outline')
        break
      case 'Discover':
        focused ? (iconName = 'compass') : (iconName = 'compass-outline')
        break
      case 'Favorites':
        focused ? (iconName = 'heart') : (iconName = 'heart-outline')
        break
      default:
        break
    }
    return <Icon name={iconName} size={20} color={color} />
  }
})

const stackOptions = ({ route, navigation }) => ({
  title: route.params?.name,
  headerBackVisible: false,
  headerLeft: ({ canGoBack }) => {
    if (!canGoBack) {
      return null
    }

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={sizes.xxl} color={colors.black} />
      </TouchableOpacity>
    )
  }
})

const discoverOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Settings')}
    >
      <Icon name="options-outline" size={sizes.xxl} color={colors.black} />
    </TouchableOpacity>
  )
})

const Stuff = ({ id, title, image, poster_path, genre_ids }) => {
  const dispatch = useDispatch()
  const fav = useSelector((state) => state.movie.favorite)

  const setFavorites = async (id, title, image, genre_ids) => {
    if (fav.find((favorite) => favorite.id === id)) {
      dispatch(removeFavorites(id))
    } else {
      dispatch(addFavorites({ id, title, image, genre_ids }))
    }
  }
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        setFavorites(id, title, `${image}${poster_path}`, genre_ids)
      }
    >
      <Icon
        name={
          fav.find((favorite) => favorite.id === id) ? 'heart' : 'heart-outline'
        }
        size={sizes.xxl}
        color={colors.black}
      />
    </TouchableOpacity>
  )
}

const detailsOptions = ({ navigation: { setParams }, route }) => ({
  title: route.params?.title,
  headerRight: () => (
    <Stuff
      id={route.params.id}
      title={route.params.title}
      image={route.params.image}
      poster_path={route.params.poster_path}
      genre_ids={route.params.genre_ids}
    />
  )
})

function Main() {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={(stackOptions, discoverOptions)}
      />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  )
}

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={stackOptions}>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={detailsOptions}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

function MainApp() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 5
  }
})

export default MainApp
