import React, { useState } from 'react'
import { Theme, ThemeContextProps, UpdateTheme } from '../hooks/ThemeContext'
import { COLORS } from './constants'

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeContextProps>('light')
  const toggleTheme = () => {
    setTheme((prevTheme: string) => (prevTheme === 'light' ? 'dark' : 'light'))
    document.documentElement.style.backgroundColor =
      theme === 'dark' ? COLORS.lightBackground : COLORS.darkBackround
    document.documentElement.style.color = theme === 'dark' ? 'black' : 'white'
  }

  return (
    <Theme.Provider value={theme}>
      <UpdateTheme.Provider value={toggleTheme}>{children}</UpdateTheme.Provider>
    </Theme.Provider>
  )
}
