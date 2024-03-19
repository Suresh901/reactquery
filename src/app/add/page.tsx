"use client"
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react'
import axios from 'axios'


const page = () => {
   const [formData, setFormData] = useState({
  title: '',
  price: '',
  file: null
});

const handleChange = (e:any) => {
  const { name, value, type } = e.target;
  const newValue = type === 'file' ? e.target.files[0] :value;
  setFormData({ ...formData, [name]: newValue });
};

  //normal post method
  
//   const handleAddProduct =async ()=>{
// try {
//       const response = await fetch('https://dummyjson.com/products/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(productData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add product');
//       }

//       const data = await response.json();
//       console.log(data); // Log the response data
//       alert('Product added successfully');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to add product');
//     }
//   };
  
  //using Mutation
  
  const mutation:any = useMutation({
    mutationFn: (newProduct) => {
      return axios.post('https://dummyjson.com/products/add', newProduct)
    },   
  })

  if(mutation.isPending){
    return <h1>Adding product.... </h1>
  }
  if(mutation.isError){
    return <h1>Is Error....{mutation.error.message} </h1>
  }

  return (

    <div className='flex gap-10 items-center justify-center h-screen'>
     <div className='flex flex-col gap-10 border border-black p-20 rounded-lg bg-gray-100'>
       <h1 className='text-3xl font-bold'>Add Products</h1>
      <div className='flex flex-col gap-10'>
        <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Product Title"
        className='border border-black rounded-md p-2 outline-none'
      />
      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Product Price"
         className='border border-black rounded-md p-2 outline-none'
      />
      <input
        type="file"
        name="file"
        onChange={handleChange}
      />
      </div>
     <div className='flex items-center gap-10 mx-auto'>
       <button onClick={() => { mutation.mutate(formData)}} 
       className='bg-green-600 text-white rounded-md p-2 outline-none'>
        Add Item
      </button>
      <Link href ='/products'>
          <button
          className='border border-black rounded-md p-2 outline-none'>
            Return Back
          </button>
      </Link>
     </div>
     </div>
    </div>
  )
}

export default page