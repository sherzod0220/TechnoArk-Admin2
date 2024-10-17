
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './routes/index'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5, retryDelay: 1000} },
})
createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <Root />
      <ReactQueryDevtools initialIsOpen={false}/> 
    </QueryClientProvider>
)
