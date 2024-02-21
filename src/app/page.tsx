'use client'
import SubTitle from '@/shared/components/SubTitle'
import Title from '@/shared/components/Title'
import { useRouter } from 'next/navigation'
import useGetUsers from '@/shared/hooks/useGetUsers'
import Lottie from 'lottie-react'
import Loading from '@/shared/lottie/loading.json'
import { formatMoney } from '@/shared/utils'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Rating from '@/shared/components/Rating'
import Button from '@/shared/components/Button'
import Image from 'next/image'
const BACKGROUND_BY_NAME = {
  Hogar: 'bg-lime-100',
  Transporte: 'bg-yellow-100',
  Alimentación: 'bg-green-100',
  Moda: 'bg-blue-100',
  'Salud y bienestar': 'bg-indigo-100',
  Otros: 'bg-purple-100'
}

export default function Home() {
  const router = useRouter()
  const { data = [], isLoading } = useGetUsers()
  const onClick = () => {
    router.push('/details')
  }
  return (
    <main className="flex justify-center">
      <div className="w-[430px] h-screen p-2 flex flex-1 flex-col gap-4 bg-slate-50">
        <div>
          <Title>Be future</Title>
          <Image
            src="/icon.jpg"
            alt="logo"
            className="mb-3"
            width={600}
            height={200}
          />
          <SubTitle>
            Somos tu compañero financiero para aprender a ahorrar y tomar el
            control de tus gastos.
          </SubTitle>
        </div>
        <h2 className="text-[30px] text-[#38434D]">
          Opiniones de nuestros usuarios
        </h2>
        <div className="flex flex-1 p-2 flex-col gap-3 mb-10">
          {isLoading && (
            <div className="flex justify-center flex-1">
              <Lottie animationData={Loading} loop />
            </div>
          )}
          {data.map((user) => (
            <div
              key={user.id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
              <div className="flex gap-2 items-center">
                <UserCircleIcon className="w-12 h-12 text-gray-900" />
                <h5 className="text-lg font-bold tracking-tight text-gray-900">
                  {user.fullName}
                </h5>
              </div>
              <Rating isDisabled rating={user.rating} />
              <p className="font-normal text-gray-700">
                {user.message || 'Buena!'}
              </p>
            </div>
          ))}
          <Button onClick={onClick}>Empezar</Button>
        </div>
      </div>
    </main>
  )
}
