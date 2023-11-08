import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home'
import InfoPage from './pages/Info'
import FavouritesPage from './pages/Favourites'
import NavBar from './components/NavBar'
import { NavBarItem } from './types'
import { ApolloClient, NormalizedCacheObject, InMemoryCache, ApolloProvider } from "@apollo/client";


const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://it2810-06.idi.ntnu.no:3000",
});


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
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="info/:id" element={<InfoPage />}></Route>
            <Route path="favourites" element={<FavouritesPage />}></Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </>
  )
}

export default App
