import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./App.css"
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import { Toaster } from'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center" />
    <RouterProvider router={router}>
         <App />
         </RouterProvider>
  </StrictMode>,
)
