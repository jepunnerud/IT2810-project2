import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home'
import InfoPage from './pages/Info'
import FavouritesPage from './pages/Favourites'
import NavBar from './components/NavBar'
import { NavBarItem } from './types'
import { ApolloClient, NormalizedCacheObject, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ThemeProvider } from './utils/ThemeContext'

const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3000',
})

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
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

export default App
