import { Link } from 'react-router-dom'
import { NavBarItem } from '../types'
import './NavBar.css'
import ToggleThemeButton from './ToggleThemeButton'
import { useTheme } from '../hooks/ThemeContext'

const NavBar = (props: { items: NavBarItem[] }) => {
  const theme = useTheme()

  return (
    <div className="nav-bar-parent-container">
      <Link to="/" key="logo">
        <img src={theme === 'dark' ? '/logowhite.png' : '/logo.png'} width="270" height="80"></img>
      </Link>
      <div className="nav-bar-parent">
        {props.items.map((item: NavBarItem) => (
          <Link to={item.path} key={item.text}>
            <div className={`${theme === 'dark' ? 'nav-bar-item-dark' : 'nav-bar-item'}`}>
              {item.text}
            </div>
          </Link>
        ))}
        <div className="toggle-theme-button-wrapper">
          <ToggleThemeButton></ToggleThemeButton>
        </div>
      </div>
    </div>
  )
}

export default NavBar
