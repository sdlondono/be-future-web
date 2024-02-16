'use client'
import { useStore } from '@/shared/hooks/useStore'
import { useForm } from 'react-hook-form'
import { ICategories } from './types'
import { ZCategoriesSchema, initialValues } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import Title from '@/shared/components/Title'
import {
  HomeIcon,
  BuildingOffice2Icon,
  CakeIcon,
  ShoppingBagIcon,
  HeartIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import SubTitle from '@/shared/components/SubTitle'
import { useEffect, useState } from 'react'
import Button from '@/shared/components/Button'
import BackButton from '@/shared/components/BackButton'
import { useRouter } from 'next/navigation'
import useGetCategories from './hooks/useGetCategories'

const Category = () => {
  const [categoriesBySelected, setCategoriesBySelected] = useState<string[]>([])
  const router = useRouter()
  const { setUser } = useStore()
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors
  } = useForm<ICategories>({
    defaultValues: initialValues,
    resolver: zodResolver(ZCategoriesSchema),
    mode: 'all'
  })

  const { data } = useGetCategories()

  useEffect(() => {
    setValue('categories', categoriesBySelected)
    clearErrors('categories')
  }, [categoriesBySelected, clearErrors, setValue])

  const onSubmit = (value: ICategories) => {
    const categories = value.categories.map((item) => ({
      name: item,
      value: ''
    }))
    setUser({ categories })
    router.push('/expenses')
  }

  return (
    <main className="flex justify-center">
      <form
        className="w-[430px] h-screen p-2 flex flex-1 flex-col justify-between gap-2 bg-slate-50"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <BackButton />
          <Title>Categoriza</Title>
          <SubTitle>
            Organiza tus gastos en cateogrias para entender mejor tus finanzas
          </SubTitle>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {data.map(({ id, name, Icon }) => {
            const isActive = categoriesBySelected.includes(name)
            const isError = !!errors.categories
            return (
              <button
                key={id}
                className={`flex flex-col justify-center items-center bg-white ${
                  isError
                    ? 'border-red-300'
                    : isActive
                    ? 'border-gray-500'
                    : 'border-gray-200'
                } border rounded-md p-2 gap-3 h-28 w-full`}
                onClick={() => {
                  setCategoriesBySelected((pre) => {
                    if (!pre.includes(name)) return [...pre, name]
                    return pre.filter((item) => item !== name)
                  })
                }}
                type="button"
              >
                <Icon />
                <span className="text-sm">{name}</span>
              </button>
            )
          })}
        </div>
        <div>
          <Button>Siguiente</Button>
        </div>
      </form>
    </main>
  )
}

export default Category
