'use client'

import SubTitle from '@/shared/components/SubTitle'
import Title from '@/shared/components/Title'
import useGetUsers from './hooks/useGetUsers'
import { formatMoney } from '@/shared/utils'
import Lottie from 'lottie-react'
import Loading from '@/shared/lottie/loading.json'
const BACKGROUND_BY_NAME = {
  Hogar: 'bg-lime-100',
  Transporte: 'bg-yellow-100',
  Alimentación: 'bg-green-100',
  Moda: 'bg-blue-100',
  'Salud y bienestar': 'bg-indigo-100',
  Otros: 'bg-purple-100'
}

const Users = () => {
  const { data = [], isLoading } = useGetUsers()

  return (
    <main className="flex justify-center">
      <div className="w-[430px] h-screen p-2 flex flex-1 flex-col gap-4 bg-slate-50">
        <div>
          <Title>Usuarios</Title>
          <SubTitle>
            Aqui encontraras los usuarios registrados en la plataforma
          </SubTitle>
        </div>
        <div className="flex flex-1 flex-col gap-3 mb-10">
          {isLoading && (
            <div className="flex justify-center flex-1">
              <Lottie animationData={Loading} loop />
            </div>
          )}
          {data.map((user) => (
            <div
              key={user.id}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                {user.fullName}
              </h5>
              <p className="font-normal text-gray-700">
                Mensaje: {user.message || 'No mensajes'}
              </p>
              <p className="font-normal text-gray-700">Edad: {user.age}</p>
              <p className="font-normal text-gray-700">
                Gatos mensuales: {formatMoney(user.monthlyIncome)}
              </p>
              <p className="font-normal text-gray-700">
                Ahorro pensado: {formatMoney(user.save)}
              </p>
              <p className="font-normal text-gray-700">Categorias:</p>
              <div className="flex flex-col gap-1 mt-1">
                {user.categories.map((category, index) => (
                  <div key={index} className="flex">
                    <div
                      className={`${
                        BACKGROUND_BY_NAME[
                          category.name as keyof typeof BACKGROUND_BY_NAME
                        ]
                      } flex gap-1 px-2 rounded-md`}
                    >
                      <span className="font-normal text-gray-700">
                        {category.name}
                      </span>
                      <span className="font-normal text-gray-700">
                        {formatMoney(category.value)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Users
