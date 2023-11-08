import { useTheme, useUpdateTheme } from '../hooks/ThemeContext'

const ToggleThemeButton = () => {
  const theme = useTheme()
  const toggleTheme = useUpdateTheme()

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      {theme === 'light' && (
        <span className="material-symbols-outlined" onClick={toggleTheme}>
          dark_mode
        </span>
      )}
      {theme === 'dark' && (
        <span className="material-symbols-outlined" onClick={toggleTheme}>
          light_mode
        </span>
      )}
    </div>
  )
}

export default ToggleThemeButton
