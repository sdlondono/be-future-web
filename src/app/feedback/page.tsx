'use client'
import { useState } from 'react'
import BackButton from '@/shared/components/BackButton'
import SubTitle from '@/shared/components/SubTitle'
import Title from '@/shared/components/Title'
import Button from '@/shared/components/Button'
import { useStore } from '@/shared/hooks/useStore'
import { supabase } from '@/shared/supabase'
import { useRouter } from 'next/navigation'
import Rating from '@/shared/components/Rating'

const FeedBack = () => {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const user = useStore((state) => state.user)
  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value)
  }

  const onSubmit = async () => {
    await supabase.from('user').insert({
      ...user,
      rating,
      message
    })
    router.push('/finale')
  }

  return (
    <main className="flex justify-center">
      <div className="w-[430px] h-screen p-2 flex flex-1 flex-col gap-3 justify-between bg-slate-50">
        <div>
          <BackButton />
          <Title>Feedback</Title>
          <SubTitle>¡Danos tu opinión para seguir mejorando!</SubTitle>
          <Rating handleRatingChange={handleRatingChange} rating={rating} />
          <div className="mt-11">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Tu mensaje
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm "
              placeholder="Escribe tus mensajes aqui..."
              value={message}
              onChange={handleMessageChange}
            />
          </div>
        </div>
        <div>
          <Button onClick={onSubmit}>Enviar</Button>
        </div>
      </div>
    </main>
  )
}

export default FeedBack
