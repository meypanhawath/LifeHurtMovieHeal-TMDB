
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './app/Home'


const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Layout />,
    errorElement: <div className='text-center text-5xl font-bold mt-10 text-white'>404, Page not found!</div>,
    children: [
      { path: "/", element: <Home /> },
      
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App