import { useTheme, useUpdateTheme } from '../hooks/ThemeContext'
import './ToggleThemeButton.css'

const ToggleThemeButton = () => {
  const theme = useTheme()
  const toggleTheme = useUpdateTheme()

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      {theme === 'light' && (
        <span
          className="material-symbols-outlined toggle-theme-button"
          onClick={toggleTheme}
        >
          dark_mode
        </span>
      )}
      {theme === 'dark' && (
        <span
          className="material-symbols-outlined toggle-theme-button"
          onClick={toggleTheme}
        >
          light_mode
        </span>
      )}
    </div>
  )
}

export default ToggleThemeButton
