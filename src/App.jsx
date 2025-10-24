
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './app/Layout'
import About from './app/About'
import Movie from './app/Movie'
import Support from './app/Support'
import People from './app/People'
import TV from './app/TV'
import Home from './app/Home'
import Favorites from './app/Favorites'
import Detail from './app/Detail'
import PersonDetail from './app/PersonDetail'

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Layout />,
    errorElement: <div className='text-center text-5xl font-bold mt-10 text-white'>404, Page not found!</div>,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "support", element: <Support /> },
      { path: "movies", element: <Movie /> },
      { path: "people", element: <People /> },
      { path: "tv-shows", element: <TV /> },
      { path: "favorites", element: <Favorites /> },
      { path: "/person/:id", element: <PersonDetail /> }, 
      { path: "/:type/:id", element: <Detail /> } 
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App