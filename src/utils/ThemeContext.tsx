import React, { useState } from 'react'
import { Theme, ThemeContextProps, UpdateTheme } from '../hooks/ThemeContext'

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeContextProps>('light')
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    document.documentElement.style.backgroundColor =
      theme === 'dark' ? '#c7f9cc' : '#22577a'
  }

  return (
    <Theme.Provider value={theme}>
      <UpdateTheme.Provider value={toggleTheme}>
        {children}
      </UpdateTheme.Provider>
    </Theme.Provider>
  )
}
