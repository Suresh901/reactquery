"use client"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const TanStackProvider = ({children}: {children:React.ReactNode}) => {
    // Create a client
const queryClient = new QueryClient()
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {children}  
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default TanStackProvider