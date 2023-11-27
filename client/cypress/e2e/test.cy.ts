import { deleteDrinkFromServer } from '../../src/hooks/Drinks'

describe('End 2 end application test for adding drink', () => {
  it('Adding a drink, searching for it, and viewing the drink page', () => {
    cy.visit('http://localhost:5173')

    // Clicks the "Add drink" button on the nav bar
    cy.get('[data-testid="navbar-Add drink"]').should('exist').should('have.text', 'Add drink')
    cy.get('[data-testid="navbar-Add drink"]').click()

    // Type "Death" into the name input field
    cy.get('[data-testid="name-input"]').type('Death')

    // Click the "Add ingredient" button four times
    cy.get('[data-testid="add-ingredient-button"]').click()
    cy.get('[data-testid="add-ingredient-button"]').click()
    cy.get('[data-testid="add-ingredient-button"]').click()
    cy.get('[data-testid="add-ingredient-button"]').click()

    // Add ingredients and measures
    cy.get('[data-testid="ingredient-0"]').type('Vodka')
    cy.get('[data-testid="measure-0"]').type('2 shots')

    cy.get('[data-testid="ingredient-1"]').type('Rum')
    cy.get('[data-testid="measure-1"]').type('2 shots')

    cy.get('[data-testid="ingredient-2"]').type('Tequila')
    cy.get('[data-testid="measure-2"]').type('2 shots')

    cy.get('[data-testid="ingredient-3"]').type('Water')
    cy.get('[data-testid="measure-3"]').type('5 ounces')
    cy.get('[data-testid="delete-ingredient-3"]').click()

    // Type instructions into the text area
    cy.get('[data-testid="instructions-input"]').type(
      'Pour all liquids into a large glass. Consume.'
    )

    // Select glass type
    cy.get('[data-testid="glass"]').select('Beer Mug')

    // Type image URL into the picture input field
    cy.get('[data-testid="picture"]').type(
      'https://png.pngtree.com/png-vector/20210907/ourmid/pngtree-beer-glass-smile-mascot-illustrations-png-image_3877759.jpg'
    )

    // Click the "Add drink" button
    cy.get('[data-testid="add-drink-button"]').click()

    // Click the "Home" button
    cy.get('[data-testid="logo"]').click()

    // Check that the filter and sorting dropdowns are rendering
    cy.get('#filter-parameter').should('exist')
    cy.get('#sort-parameter').should('exist')

    // Click the filter dropdown, and select whisky
    cy.get('#filter-parameter').select('Whisky')

    // Search for the drink
    cy.get('[data-testid="search"]').type('Death')
    cy.get('[data-testid="search-icon"]').click()

    // Check that the drink doesn't show up (as it doesn't contain whisky)
    cy.get('[data-testid="drink-card-Death"]').should('not.exist')

    // Click the filter dropdown, and select vodka
    cy.get('#filter-parameter').select('')

    // Check tha the drink shows up, and click the drink card
    cy.get('[data-testid="drink-card-Death"]').should('exist')
    cy.get('[data-testid="drink-card-Death"]').click()

    // Click the "Add to favourites" button
    cy.get('[data-testid="add-to-favourites-button"').click()

    // Go to the favourites page through the navbar
    cy.get('[data-testid="navbar-Favourites"').click()

    // Remove the drink from the favourites list
    cy.get('[data-testid="drink-card-Death"]').should('exist')
    cy.get('[data-testid="favourite-button-Death"]').click()

    // Go to the home page, then back to the favourites page (to re-render the favourites page)
    cy.get('[data-testid="logo"]').click()
    cy.get('[data-testid="navbar-Favourites"').click()

    // Check that the drink is no longer in the favourites list
    cy.get('[data-testid="drink-card-Death"]').should('not.exist')

    // Go to the home page
    cy.get('[data-testid="logo"]').click()

    // Search for the drink
    cy.get('[data-testid="search"]').type('Death')
    cy.get('[data-testid="search-icon"]').click()

    // Click the drink card
    cy.get('[data-testid="drink-card-Death"]').should('exist')
    cy.get('[data-testid="drink-card-Death"]').click()

    // Delete the drink from the database. This is to ensure that the drinks added through testing are not overpopulating the database.
    let slug = ''
    cy.url().then((url) => {
      slug = url.split('/').pop()!
      deleteDrinkFromServer(slug)
    })

    // Go back to the home page
    cy.get('[data-testid="logo"]').click()
  })
})

describe('Test sorting', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('Sorting by name ascending', () => {
    cy.get('#sort-parameter').should('exist')

    cy.get('#sort-parameter').select('name-asc')

    //Collect all drink names
    cy.get('[data-testid="drinkname"]').then((drinkElements) => {
      const extractedNames = drinkElements.map((_index, el) => Cypress.$(el).text()).get()

      // Check if the names are in alphabetical order
      const sortedNames = [...extractedNames].sort()
      expect(extractedNames).to.deep.equal(sortedNames)
    })
  })
  it('Sorting by name descending', () => {
    cy.get('#sort-parameter').select('name-desc')

    // Collect all drink names
    cy.get('[data-testid="drinkname"]').then((drinkElements) => {
      const extractedNames = drinkElements.map((_index, el) => Cypress.$(el).text()).get()

      // Check if the names are in reverse alphabetical order
      const sortedNames = [...extractedNames].sort().reverse()
      expect(extractedNames).to.deep.equal(sortedNames)
    })
  })

  it('Sorting by difficulty acending', () => {
    cy.get('#sort-parameter').select('difficulty-asc')

    const instructionLengths: number[] = []

    // Function to get the length of instructions and add to the list by clicking in on drink
    const getInstructionLength = (index: number) => {
      cy.get('[data-testid="drinkname"]').eq(index).click()
      cy.get('[data-testid="instructions"]')
        .invoke('text')
        .then((text) => {
          instructionLengths.push(text.length)
          cy.go('back')
        })
    }

    getInstructionLength(0)
    getInstructionLength(1)
    getInstructionLength(2)

    //Checks that the
    cy.then(() => {
      const sortedLengths = [...instructionLengths].sort((a, b) => a - b)
      expect(instructionLengths).to.deep.equal(sortedLengths)
    })
  })

  it('Sorting by name ascending', () => {
    cy.get('#sort-parameter').select('difficulty-asc')

    const instructionLengths: number[] = []

    // Function to get the length of instructions and add to the list
    const getInstructionLength = (index: number) => {
      cy.get('[data-testid="drinkname"]').eq(index).click()
      cy.get('[data-testid="instructions"]')
        .invoke('text')
        .then((text) => {
          instructionLengths.push(text.length)
          cy.go('back')
        })
    }

    getInstructionLength(0)
    getInstructionLength(1)
    getInstructionLength(2)

    // Click on the second drink
    cy.then(() => {
      const sortedLengths = [...instructionLengths].sort((a, b) => a - b)
      expect(instructionLengths).to.deep.equal(sortedLengths)
    })
  })
})
