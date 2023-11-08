import React from 'react'
import { useContext } from 'react'

export type ThemeContextProps = 'light' | 'dark'

export type UpdateThemeContextProps = () => void | null

export const Theme = React.createContext<ThemeContextProps>('light')
export const UpdateTheme = React.createContext<UpdateThemeContextProps>(() => null)

export const useTheme = () => useContext(Theme)
export const useUpdateTheme = () => useContext(UpdateTheme)
