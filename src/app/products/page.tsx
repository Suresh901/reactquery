"use client"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"

const fetchProducts = async () =>{
  const response = await fetch(`https://dummyjson.com/products`)
  const data = await response.json()
  return data.products;
}

const page = () => {
  
   // Queries
  const {data: productsData, isLoading, isError} = useQuery <any> (
    { queryKey: ['products'], 
    queryFn: fetchProducts,
    staleTime: 10000
    //enabled !! productsData (allias)   for rendering 1st api and 2nd will be renedered afterwards
  })
 
  if(isLoading){
    return <div>Loading...</div>
  }

  if(isError){
    return <div>Error...</div>
  }
  
  return (
    <div className="mb-10">
      <div className="">
      <h1 className="font-bold text-3xl flex flex-col items-center mt-10">Products List</h1>
     <Link href='/add'>
      <div className="flex justify-end">
        <button className="bg-green-600 text-white p-2 rounded-md mx-10">Add Product</button>
      </div>
     </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">        
          {
          productsData?.map((item: any)=>{
            return(
              <Link href={`/product/${item.id}`}>
              <div className="mx-20 cursor-pointer mt-10" key={item.id}>
                    <div className="h-[300px] flex items-center justify-center overflow-hidden mb-5">
                     <Image 
                     src={item.thumbnail} 
                     alt="img" 
                     width={500} 
                     height={500}
                      className=""/>
                    </div>
                    <div className="text-xl font-bold flex flex-col gap-2">
                      <h1>{item.title}</h1>
                      <h1>${item.price}</h1>
                    </div>
                  </div>
              </Link> 
            )
          })
        }
        </div>

      </div>
    </div>
  )
}

export default page

