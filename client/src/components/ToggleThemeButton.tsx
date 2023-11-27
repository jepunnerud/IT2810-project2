import { useTheme, useUpdateTheme } from '../hooks/ThemeContext'

const ToggleThemeButton = () => {
  const theme = useTheme()
  const toggleTheme = useUpdateTheme()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      toggleTheme()
    }
  }

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      {theme === 'light' && (
        <span className="material-symbols-outlined toggle-theme-button" onClick={toggleTheme}>
          dark_mode
        </span>
      )}
      {theme === 'dark' && (
        <span className="material-symbols-outlined toggle-theme-button" onClick={toggleTheme}>
          light_mode
        </span>
      )}
    </div>
  )
}

export default ToggleThemeButton
