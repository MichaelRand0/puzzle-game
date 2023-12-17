import React from 'react'

interface Props {}

const ModalIntro = (props: Props) => {
  return (
    <div className='flex items-center text-black justify-end flex-col h-full'>
      <img className='w-[52px] h-[52px] rotate-[60deg] absolute top-5 object-cover left-12' src='puzzle-orange.png' />
      <img className='w-[42px] h-[42px] absolute top-10 object-cover left-[40%]' src='puzzle-blue.png' />
      <img className='w-[50px] h-[50px] absolute top-2 object-cover left-[46%]' src='puzzle-orange.png' />
      <img className='w-[50px] h-[50px] absolute top-[40%] object-cover right-2' src='puzzle-blue.png' />
      <img className='w-[38px] h-[38px] absolute top-[64%] object-cover left-[61%]' src='puzzle-orange.png' />
      <img className='w-[38px] h-[38px] absolute top-[64%] object-cover rotate-45 left-[32%]' src='puzzle-blue.png' />
      <h2 className='text-base text-center font-bold mb-6'>Поздравляем с Международным Днем Бухгалтера!</h2>
      <p className='text-base text-center mb-10'>Пусть пазлы вашего благополучия сложатся успешно!</p>
      <img className='w-[121px] h-[130px] object-cover' src="cat.svg" />
    </div>
  )
}

export default ModalIntro