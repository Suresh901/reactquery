import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen flex items-center justify-center text-3xl'>
      <Link href='/products'>
      <h1 className='border border-black p-5 rounded-lg hover:bg-red-500 hover:text-white'>Go to products</h1>
      </Link>
    </div>
  )
}

export default page