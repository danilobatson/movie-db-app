import axios from 'axios'
import { API_KEY } from '../lib/constants'
import { useState, useEffect } from 'react'

const baseURL = 'https://api.themoviedb.org/3/'

export default function (path, query = '') {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const url = `${baseURL}${path}?api_key=${API_KEY}${query}`

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
