import { render, waitFor, screen } from '@testing-library/react'
import HomePage from '../pages/Home'
import { describe, expect, it } from 'vitest'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'

describe('Home Page snapshot test', () => {
  beforeEach(() => {
    vi.mock('react-router-dom', async () => {
      const actual = (await vi.importActual('react-router-dom')) as object
      return {
        ...actual,
        useSearchParams: () => [new URLSearchParams()],
        useNavigate: () => vi.fn(),
      }
    })
  })

  const mocks = [
    {
      request: {
        query: gql`
          query GetAllDrinks($ingredient: String, $limit: Int, $skip: Int, $sort: String) {
            drinks(ingredient: $ingredient, limit: $limit, skip: $skip, sort: $sort) {
              drinks {
                _id
                name
                picture
              }
              pageInfo {
                totalCount
                totalPages
              }
            }
          }
        `,
        variables: {
          ingredient: '',
          limit: 12,
          skip: 0,
          sort: 'name-asc',
        },
      },
      result: {
        data: {
          drinks: {
            drinks: [
              {
                _id: '1',
                name: 'TestDrink',
                picture: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
                ingredients: [
                  {
                    ingredient: 'Test Ingredient',
                  },
                ],
              },
            ],
            pageInfo: { totalCount: 1, totalPages: 1 },
          },
        },
      },
    },
  ]
  const renderHomePage = () => {
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </MockedProvider>
    )
  }

  it('should render the home page', async () => {
    const homePage = renderHomePage()
    await waitFor(() => {
      screen.getAllByTestId('drink-card-TestDrink')
    })
    expect(homePage).toMatchSnapshot()
  })
})
