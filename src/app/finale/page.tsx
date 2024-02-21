'use client'
import BackButton from '@/shared/components/BackButton'
import SubTitle from '@/shared/components/SubTitle'
import Title from '@/shared/components/Title'
import React from 'react'
import Lottie from 'lottie-react'
import Check from '@/shared/lottie/check.json'
import Button from '@/shared/components/Button'
import { useRouter } from 'next/navigation'

const Finale = () => {
  const router = useRouter()
  const onSubmit = () => {
    router.push('/')
  }
  return (
    <main className="flex justify-center">
      <div className="w-[430px] h-screen p-2 flex flex-1 flex-col gap-3 justify-between bg-slate-50">
        <div>
          <BackButton />
          <Title>¡Gracias!</Title>
          <SubTitle>
            ¡Te agradecemos enormemente por confiar en nosotros y elegir nuestro
            servicio!
          </SubTitle>
          <div className="flex my-10">
            <Lottie animationData={Check} loop={false} />
          </div>
          <div>
            <Button onClick={onSubmit}>Volver al inicio</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Finale
