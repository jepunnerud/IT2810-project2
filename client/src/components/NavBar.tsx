import { Link } from 'react-router-dom'
import { NavBarItem } from '../types'
import './NavBar.css'
import ToggleThemeButton from './ToggleThemeButton'
import { useTheme } from './../hooks/ThemeContext'

const NavBar = (props: { items: NavBarItem[] }) => {
  const theme = useTheme()

  return (
    <div className="nav-bar-parent-container">
      <Link to="/" key="logo" data-testid="logo">
        <img
          className="logo"
          src={theme === 'dark' ? '/project2/logowhite.png' : '/project2/logo.png'}
          width="270"
          height="80"
        ></img>
      </Link>
      <div className="nav-bar-parent">
        {props.items.map((item: NavBarItem) => (
          <Link to={item.path} key={item.text} data-testid={`navbar-${item.text}`}>
            <div className={`nav-bar-item ${theme === 'dark' ? 'dark' : 'light'}`}>{item.text}</div>
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
