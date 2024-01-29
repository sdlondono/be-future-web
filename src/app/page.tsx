'use client'
import Controller from '@/shared/components/Controller'
import SubTitle from '@/shared/components/SubTitle'
import Title from '@/shared/components/Title'
import { useForm } from 'react-hook-form'
import { IDetails } from './types'
import { ZDetailsSchema, initialDetailsValue } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/shared/components/Button'
import { useStore } from '@/shared/hooks/useStore'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting }
  } = useForm<IDetails>({
    defaultValues: initialDetailsValue,
    resolver: zodResolver(ZDetailsSchema),
    mode: 'all'
  })

  const { setUser } = useStore()

  const onSubmit = (value: IDetails) => {
    setUser({ ...value })
    router.push('/category')
  }

  return (
    <main className="flex justify-center">
      <form
        className="w-[430px] h-screen p-2 flex flex-1 flex-col justify-between gap-2 bg-slate-50"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Title>Detalles</Title>
          <SubTitle>Iniciemos con algo simple, cuentanos sobre ti</SubTitle>
        </div>
        <div className="mt-10 flex flex-1 gap-3 flex-col">
          <Controller
            control={control}
            name="fullName"
            placeholder="Nombre completo"
            label="Cual es tu nombre?"
            isError={!!errors.fullName}
            error={errors.fullName?.message}
          />
          <Controller
            control={control}
            name="age"
            placeholder="Ingresa tu edad"
            label="Que edad tienes?"
            isError={!!errors.age}
            error={errors.age?.message}
            type="number"
          />
          <Controller
            control={control}
            name="monthlyIncome"
            placeholder="Ingresa tus ingresos mensuales"
            label="Cuantos son tus ingresos?"
            isError={!!errors.monthlyIncome}
            error={errors.monthlyIncome?.message}
            type="number"
          />
          <Controller
            control={control}
            name="save"
            placeholder="Ingresa cuanto te gustaria ahorrar"
            label="Cuanto te gustaria ahorrar?"
            isError={!!errors.save}
            error={errors.save?.message}
            type="number"
          />
        </div>
        <div>
          <Button>Siguiente</Button>
        </div>
      </form>
    </main>
  )
}
