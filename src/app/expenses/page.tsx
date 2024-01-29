'use client'
import BackButton from '@/shared/components/BackButton'
import Button from '@/shared/components/Button'
import SubTitle from '@/shared/components/SubTitle'
import Title from '@/shared/components/Title'
import { useStore } from '@/shared/hooks/useStore'
import { IExpenses } from './types'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZExpensesSchema } from './constants'
import { useRouter } from 'next/navigation'
import { Children } from 'react'
import Controller from '@/shared/components/Controller'

const Expenses = () => {
  const router = useRouter()
  const { user, setUser } = useStore()
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting }
  } = useForm<IExpenses>({
    defaultValues: {
      fieldsArray: user?.categories ?? []
    },
    resolver: zodResolver(ZExpensesSchema),
    mode: 'all'
  })

  const { fields } = useFieldArray<IExpenses>({
    control,
    name: 'fieldsArray'
  })

  const onSubmit = (value: IExpenses) => {
    setUser({ categories: value.fieldsArray })
    router.push('/proposal')
  }

  return (
    <main className="flex justify-center">
      <form
        className="w-[430px] h-screen p-2 flex flex-1 flex-col justify-between gap-2 bg-slate-50"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <BackButton />
          <Title>Gastos Mensuales</Title>
          <SubTitle>
            Organicemos tus gastos mensuales de manera detallada
          </SubTitle>
        </div>
        <div className="flex flex-col flex-1 mt-10">
          {Children.toArray(
            fields.map((_, index) => (
              <Controller
                control={control}
                name={`fieldsArray.${index}.value`}
                placeholder="Total de gastos"
                label={`Gastos en ${fields[index].name.toLowerCase()}`}
                isError={!!errors.fieldsArray?.[index]?.value}
                error={errors.fieldsArray?.[index]?.value?.message}
                type="number"
              />
            ))
          )}
        </div>
        <div>
          <Button>Siguiente</Button>
        </div>
      </form>
    </main>
  )
}

export default Expenses
