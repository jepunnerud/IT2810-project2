import { Link } from 'react-router-dom'
import { NavBarItem } from '../types'
import './NavBar.css'
import ToggleThemeButton from './ToggleThemeButton'

const NavBar = (props: { items: NavBarItem[] }) => {
  return (
    <div className="nav-bar-parent-container">
      <Link to="/" key="logo">
        <img src="/logo.png" width="270" height="80"></img>
      </Link>
      <div className="nav-bar-parent">
        {props.items.map((item: NavBarItem) => (
          <Link to={item.path} key={item.text}>
            <div className="nav-bar-item">{item.text}</div>
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
