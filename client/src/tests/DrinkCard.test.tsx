import { fireEvent, render, screen } from '@testing-library/react'
import DrinkCard from '../components/DrinkCard'
import { ThemeProvider } from '../utils/ThemeContext'
import { expect } from 'vitest'
import { Drink, Ingredient } from '../types'
import { MemoryRouter as Router } from 'react-router-dom'

const mockingredient: Ingredient = {
  ingredient: 'Vodka',
  measure: '1 cup',
}

const mockDrink: Drink = {
  name: 'mockDrink',
  _id: '1',
  category: 'Ordinary Drink',
  picture:
    'https://www.aperitif.no/storage/image/core_files/2023/11/5/ac819226cf40c5b3ae5fc258b872201f/jpg/aperitif/related_news/iStock-1384536563.webp',
  instructions: 'Drink up!',
  alcoholic: true,
  ingredients: [mockingredient],
  glass: 'Cocktail Glass',
}

describe('Testing DrinkCard', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <Router>
          <DrinkCard drink={mockDrink}></DrinkCard>
        </Router>
      </ThemeProvider>
    )
  })

  it('Check name on drinkCard', async () => {
    const country = screen.findByText('mockDrink')
    expect(country).toBeDefined()
  })

  it('Check for picture', async () => {
    const pic = screen.findByTestId('picture')
    expect(pic).toBeDefined()
    expect((await pic).getAttribute('src')).toBe(mockDrink.picture)
    expect((await pic).getAttribute('alt')).toBe(mockDrink.name)
  })

  it('Check favourite button', async () => {
    const favouriteButton = await screen.findByTestId('favourite-button-mockDrink')
    fireEvent.click(favouriteButton)

    const storedFavourites = JSON.parse(localStorage.getItem('drink-favourites') || '[]')
    expect(storedFavourites.includes('1')).toBeTruthy()
  })
})
