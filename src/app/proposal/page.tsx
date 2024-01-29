'use client'
import BackButton from '@/shared/components/BackButton'
import SubTitle from '@/shared/components/SubTitle'
import Title from '@/shared/components/Title'
import { useEffect, useMemo } from 'react'
import confetti from 'canvas-confetti'
import Button from '@/shared/components/Button'
import { useStore } from '@/shared/hooks/useStore'
import { calculateMonthsToReachGoal, formatMoney } from '@/shared/utils'
import { useRouter } from 'next/navigation'

const Proposal = () => {
  const user = useStore((state) => state.user)
  const router = useRouter()
  console.log(user)
  const sumCategories = useMemo(() => {
    return (
      user?.categories?.reduce((acc, category) => {
        return acc + Number(category.value)
      }, 0) ?? 0
    )
  }, [user?.categories])

  const totalSave = useMemo(
    () => Number(user?.monthlyIncome) - sumCategories,
    [user?.monthlyIncome, sumCategories]
  )

  useEffect(() => {
    confetti()
  }, [])

  const monthNeeded = useMemo(() => {
    if (!totalSave || !user?.save) return calculateMonthsToReachGoal(0, 0, 10)
    return calculateMonthsToReachGoal(totalSave, Number(user.save), 10)
  }, [totalSave, user?.save])

  const onClick = () => router.push('/feedback')

  return (
    <main className="flex justify-center">
      <div className="w-[430px] h-screen p-2 flex flex-1 flex-col justify-between gap-2 bg-slate-50">
        <div>
          <BackButton />
          <Title>Propuesta final</Title>
          <SubTitle>Esto es lo que te proponemos</SubTitle>
        </div>
        <div className="mt-10 flex flex-col flex-1 gap-4">
          <div className="flex gap-2">
            <span className="text-xl">Gastos totales</span>
            <span className="text-xl font-bold">
              {formatMoney(sumCategories ?? 0)}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-xl">Ahorro total</span>
            <span className="text-xl font-bold">
              {formatMoney(totalSave ?? 0)}
            </span>
          </div>
          <div className="flex">
            <span className="text-xl">
              Si ahorras <span className="font-bold">10%</span> de tus ahorros
              en <span className="font-bold">{String(monthNeeded)}</span> meses
              ahorraras{' '}
              <span className="font-bold">
                {formatMoney(Number(user?.save))}
              </span>{' '}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl">Puedes invertir en</span>
            <a
              className="text-xl text-blue-600"
              href="https://www.bancolombia.com/personas/productos-servicios/inversiones/cdts/inversion-virtual/simulador-inversion-virtual"
            >
              Simulador de inversion virtual Bancolombia
            </a>
          </div>
        </div>
        <div>
          <Button onClick={onClick}>Siguiente</Button>
        </div>
      </div>
    </main>
  )
}

export default Proposal
