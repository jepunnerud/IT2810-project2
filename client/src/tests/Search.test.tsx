import SearchBar from '../components/SearchBar'
import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../utils/ThemeContext'
import { MemoryRouter as Router } from 'react-router-dom'

describe('Testing search', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <Router>
          <SearchBar placeholder={''}></SearchBar>
        </Router>
      </ThemeProvider>
    )
  })

  test('searchbar renders', () => {
    expect(screen.getByTestId('searchbar-container')).toBeDefined
  })

  test('initial navigation is /', () => {
    expect(window.location.pathname).toBe('/')
  })
})
