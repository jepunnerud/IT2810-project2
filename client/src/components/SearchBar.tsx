import { useState } from 'react'
import { useTheme } from '../hooks/ThemeContext.ts'
import './SearchBar.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
function SearchBar(props: { placeholder: string }) {
  const theme = useTheme()
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const clearInput = () => {
    const inputField = document.getElementById('input') as HTMLInputElement
    inputField.value = ''
    setInputValue('')
  }

  return (
    <>
      <div className={`searchbar-container ${theme}`} data-testid="searchbar-container">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <span
          data-testid="search-icon"
          className={`material-symbols-outlined search-icon ${theme}`}
          onClick={() => {
            if (inputValue !== '')
              navigate(
                `/search?q=${inputValue}${
                  searchParams.get('filter') ? `&filter=${searchParams.get('filter')}` : ''
                }${searchParams.get('sort') ? `&sort=${searchParams.get('sort')}` : ''}`
              )
          }}
        >
          search
        </span>
        <input
          data-testid="search"
          id="input"
          className={`searchbar-input ${theme}`}
          placeholder={props.placeholder}
          onInput={(e) => {
            const q = e.currentTarget.value
            setInputValue(q)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              navigate(
                `/search?q=${inputValue}${
                  searchParams.get('filter') ? `&filter=${searchParams.get('filter')}` : ''
                }${searchParams.get('sort') ? `&sort=${searchParams.get('sort')}` : ''}`
              )
            }
          }}
        ></input>
        {inputValue !== '' && (
          <span
            className={`material-symbols-outlined clear-button ${theme}`}
            data-testid="clear-search-button"
            onClick={() => {
              clearInput()
            }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                clearInput()
              }
            }}
          >
            close
          </span>
        )}
      </div>
    </>
  )
}

export default SearchBar
