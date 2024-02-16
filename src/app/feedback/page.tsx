'use client'
import { useState } from 'react'
import BackButton from '@/shared/components/BackButton'
import SubTitle from '@/shared/components/SubTitle'
import Title from '@/shared/components/Title'
import Button from '@/shared/components/Button'
import { useStore } from '@/shared/hooks/useStore'
import { supabase } from '@/shared/supabase'
import { useRouter } from 'next/navigation'

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
          <div className="flex gap-2 my-5">
            {[1, 2, 3, 4, 5].map((index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${
                  index <= rating
                    ? 'text-yellow-300'
                    : 'text-gray-300 dark:text-gray-500'
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                onClick={() => handleRatingChange(index)}
                role="button"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
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
