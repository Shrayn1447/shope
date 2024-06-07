'use client'
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
export default function page() {
    const router = useRouter()
  return (
    <main className='min-h-screen flex flex-col justify-center items-center gap-4'>
        <div className='flex items-center bg-white rounded-xl text-black font-bold p-4 gap-2'>
            <p className='text-3xl'>Оплачено</p>
            <Check size={100} color='green'/>
        </div>
         <div>
                <Button onClick={() => router.push('/')}>На главную</Button>
         </div>
    </main>
  )
}
