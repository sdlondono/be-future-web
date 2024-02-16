import { useEffect, useState } from 'react'
import { supabase } from '@/shared/supabase'
import {
  HomeIcon,
  BuildingOffice2Icon,
  CakeIcon,
  ShoppingBagIcon,
  HeartIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'

function useGetCategories() {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState<
    { id: string; name: string; Icon: () => React.ReactNode }[]
  >([])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('category').select('*')
      if (error) throw error
      if (!data) throw new Error('No data')
      const transform = data.map((category) => {
        switch (category.name) {
          case 'Hogar':
            return {
              ...category,
              Icon: () => <HomeIcon className="w-10 h-10" />
            }
          case 'Transporte':
            return {
              ...category,
              Icon: () => <BuildingOffice2Icon className="w-10 h-10" />
            }
          case 'Alimentación':
            return {
              ...category,
              Icon: () => <CakeIcon className="w-10 h-10" />
            }
          case 'Moda':
            return {
              ...category,
              Icon: () => <ShoppingBagIcon className="w-10 h-10" />
            }
          case 'Salud y bienestar':
            return {
              ...category,
              Icon: () => <HeartIcon className="w-10 h-10" />
            }
          case 'Otros':
            return {
              ...category,
              Icon: () => <QuestionMarkCircleIcon className="w-10 h-10" />
            }
          default:
            return {
              ...category,
              Icon: () => <QuestionMarkCircleIcon className="w-10 h-10" />
            }
        }
      }) as { id: string; name: string; Icon: () => React.ReactNode }[]
      setData(transform)
    } catch (error) {
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

export default useGetCategories
