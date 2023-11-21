import { useState } from 'react'
import { useTheme } from '../hooks/ThemeContext.ts'
import './SearchBar.css'
import { useNavigate } from 'react-router-dom'
function SearchBar(props: { placeholder: string }) {
  const theme = useTheme()
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()
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
          className={`material-symbols-outlined search-icon ${theme}`}
          onClick={() => {
            const q = (document.getElementById('input') as HTMLInputElement).value
            if (q !== '') navigate(`/search?q=${q}`)
          }}
        >
          search
        </span>
        <input
          id="input"
          data-testid="input-field"
          className={`searchbar-input ${theme}`}
          placeholder={props.placeholder}
          onInput={(e) => {
            const q = e.currentTarget.value
            setInputValue(q)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              const q = e.currentTarget.value
              navigate(`/search?q=${q}`)
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
