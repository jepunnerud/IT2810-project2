import FilterDropdown from '../components/FilterDropdown'
import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../utils/ThemeContext'

const input = {
  value: 'vodka',
  label: 'Filter by ingredient',
  changeHandler: () => {},
  pageHandler: () => {},
  lastPageHandler: () => {},
}

describe('Testing filter dropdown', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <FilterDropdown {...input}></FilterDropdown>
      </ThemeProvider>
    )
  })

  test('filter dropdown renders', () => {
    const element = screen.getByLabelText('Filter by ingredient')
    expect(element).toBeDefined()
  })

  test('value of dropdown is Vodka', () => {
    const selectElement = screen.getByTestId('option-vodka')
    expect(selectElement.textContent).toBe('Vodka')
  })

  test('close filter button is visible when value is not empty', () => {
    expect(screen.getByTestId('close-filter-button')).toBeDefined()
  })
})
