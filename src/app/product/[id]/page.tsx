"use client"
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react'

//fetching data using dynamic id
const fetchProduct = async (id:any) =>{
  const response = await fetch(`https://dummyjson.com/product/${id}`)
  const data = await response.json()
  return data;
}

const page = ({params}:any) => {
    //normal fetch
    // const product = await fetchProduct(params.id)
    // console.log(product);  

   const {data:product, isLoading, isError} = useQuery({
     queryKey: ['product', params.id], 
     queryFn: () => fetchProduct(params.id), 
     staleTime: 10000
    })
    // console.log(params.id);
    

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className='flex items-center gap-10 mt-10 mx-10'>
        <div className='w-1/2 flex items-center justify-center'>
            <Image src= {product.thumbnail} 
            alt="img"
            width={500}
            height={500}
            className=''/>
        </div>
        <div className='w-1/2'>
            <h1 className='text-xl font-bold'>Title:</h1>
            <p className='text-2xl'>{product.title}</p>
            <h1 className='text-xl font-bold'>Description: </h1>
            <p className='text-2xl'>{product.description}</p>
            <h1 className='text-xl font-bold'>Rating: </h1>
            <p className='text-2xl'>{product.rating}</p>
            <h1 className='text-xl font-bold'>Price: </h1>
            <p className='text-2xl'>{product.price}</p>
       
        </div>
    </div>
  )
}

export default page