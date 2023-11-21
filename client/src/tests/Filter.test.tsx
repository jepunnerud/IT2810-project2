import FilterDropdown from '../components/FilterDropdown'
import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../utils/ThemeContext'

const input = {
  value: 'vodka',
  label: 'Filter by ingredient',
  changeHandler: (value: string) => {},
  pageHandler: () => {},
  lastPageHandler: (isLastPage: any) => {},
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

  //   test('test whisky', () => {
  //     const selectElement = getByLabelText('Filter by ingredient')

  //     // Check if the component renders correctly
  //     expect(container.querySelector('.dropdown-wrapper')).toBeTruthy()

  //     // Simulate a select change
  //     fireEvent.change(selectElement, { target: { value: 'whisky' } })

  //     // Check if changeHandler, pageHandler, and lastPageHandler are called with the expected arguments
  //     expect(changeHandler).toHaveBeenCalledWith('whisky')
  //     expect(pageHandler).toHaveBeenCalled()
  //     expect(lastPageHandler).toHaveBeenCalledWith(false)
  //   })
})
