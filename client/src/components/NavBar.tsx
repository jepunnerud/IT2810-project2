import { NavBarItem } from '../types'
import './NavBar.css'

const NavBar = (props: { items: NavBarItem[] }) => {
  return (
    <div className="nav-bar-parent-container">
      <a href="/" key="logo">
        <img src="/logo.png" width="270" height="80"></img>
      </a>
      <div className="nav-bar-parent">
        {props.items.map((item: NavBarItem) => (
          <a href={item.path} key={item.text}>
            <div className="nav-bar-item">{item.text}</div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default NavBar
