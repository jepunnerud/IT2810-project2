import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home'
import InfoPage from './pages/Info'
import FavouritesPage from './pages/Favourites'
import NavBar from './components/NavBar'
import { NavBarItem } from './types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const navBarItems: NavBarItem[] = [
  {
    text: 'Home',
    path: '/',
  },
  {
    text: 'Favourites',
    path: '/favourites',
  },
]

function App() {
  return (
    <>
      <header>
        <NavBar items={navBarItems}></NavBar>
      </header>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="info/:drinkid" element={<InfoPage />}></Route>
            <Route path="favourites" element={<FavouritesPage />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App