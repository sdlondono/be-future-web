import { useEffect, useState } from 'react'
import { supabase } from '@/shared/supabase'

type IUser = {
  id: string
  fullName: string
  age: string
  monthlyIncome: string
  save: string
  message: string
  categories: { name: string; value: string }[]
  rating: number
}

function useGetUsers() {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState<IUser[]>([])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('user').select('*')

      if (error) throw new Error(`Supabase error: ${error.message}`)

      if (!data) throw new Error('No data received from Supabase')

      const transformPromises = data
        .sort((a, b) => b.rating - a.rating)
        .map(async (user) => {
          try {
            const categories = JSON.parse(user.categories)
            return { ...user, categories }
          } catch (parseError) {
            throw new Error(`Error parsing categories for user ${user.id}`)
          }
        })

      const transformedData = await Promise.all(transformPromises)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      setData(transformedData)
    } catch (fetchError) {
      console.error(`Error fetching categories`)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return {
    data,
    isLoading,
    isError
  }
}

export default useGetUsers
