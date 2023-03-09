import axios from 'axios'
import { API_KEY } from '../lib/constants'
import { useState, useEffect } from 'react'

const baseURL = 'https://api.themoviedb.org/3/movie/'

export default function (id) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const url = `${baseURL}${id}/credits?api_key=${API_KEY}`


  const getData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(url)
      setData(response.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getData()
  }, [url])

  return { data, error, loading }
}

// https://api.themoviedb.org/3/movie/631842/credits?api_key={{TMDB_API_KEY}}