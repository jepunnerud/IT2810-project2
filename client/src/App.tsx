import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home'
import InfoPage from './pages/Info'
import FavouritesPage from './pages/Favourites'
import AddDrink from './pages/AddDrink'
import NavBar from './components/NavBar'
import SearchResultPage from './pages/SearchResult'
import { NavBarItem } from './types'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from './utils/ThemeContext'
import { apolloClient } from './hooks/Drinks'

const navBarItems: NavBarItem[] = [
  {
    text: 'Home',
    path: '/',
  },
  {
    text: 'Favourites',
    path: '/favourites',
  },
  {
    text: 'Add drink',
    path: '/add_drink',
  },
]

function App() {
  return (
    <>
      <ThemeProvider>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter basename="/project2">
            <header>
              <NavBar items={navBarItems}></NavBar>
            </header>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/info/:id" element={<InfoPage />}></Route>
              <Route path="/favourites" element={<FavouritesPage />}></Route>
              <Route path="/add_drink" element={<AddDrink />}></Route>
              <Route path="/search" element={<SearchResultPage />}></Route>
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default App
