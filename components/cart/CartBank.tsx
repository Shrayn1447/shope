'use client'
import { Input } from '../ui/input'
import React, { useState } from 'react'

export default function CartBank() {
  const [cardNumber, setCardNumber] = useState('');

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, ''); 
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    const formattedValue = value.match(/.{1,4}/g)?.join(' ') || ''; 
    setCardNumber(formattedValue);
  };
  return (
    <div className='w-[500px] border h-[250px] rounded-xl p-4'>
    
    <form autoComplete="off" className='h-full flex flex-col justify-center gap-8'>
      <div>
        <h2>Номер карты</h2>
      <Input 
            placeholder='0000 0000 0000 0000' 
            type="text" 
            className='w-full bg-black' 
            autoComplete="off" 
            value={cardNumber} 
            onChange={handleCardNumberChange} 
          />
      </div>
      <div className='flex gap-5'>
        <Input type="text" autoComplete="off" className='bg-black' placeholder='KIRIL AHMEROV' />
        <Input className='w-[100px] text-[20px] bg-black' maxLength={3} type="password" autoComplete="new-password" placeholder='***'/>
      </div>
    </form>
  </div>
  )
}
