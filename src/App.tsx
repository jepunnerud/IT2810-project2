import './App.css'
import NavBar from './components/NavBar'
import { NavBarItem } from './types'

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
    path: '/add-drink',
  },
]

function App() {
  return (
    <>
      <header>
        <NavBar items={navBarItems}></NavBar>
      </header>
    </>
  )
}

export default App
