import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

const BackButton = () => {
  const router = useRouter()
  return (
    <button type="button" onClick={() => router.back()}>
      <ArrowLeftIcon className="w-10 h-10 text-[#38434D]" />
    </button>
  )
}

export default BackButton
