import { useState } from 'react'
import { useTheme } from '../hooks/ThemeContext'
import './SearchBar.css'
function SearchBar(props: {
  placeholder: string
  searchHandler: (q: string) => void
  inputHandler: React.Dispatch<React.SetStateAction<string>>
}) {
  const theme = useTheme()
  const [inputValue, setInputValue] = useState('')
  const clearInput = () => {
    const inputField = document.getElementById('input') as HTMLInputElement
    inputField.value = ''
    setInputValue('')
  }

  return (
    <>
      <div className={`searchbar-container ${theme}`}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <span className={`material-symbols-outlined search-icon ${theme}`}>search</span>
        <input
          id="input"
          className={`searchbar-input ${theme}`}
          placeholder={props.placeholder}
          onInput={(e) => {
            const q = e.currentTarget.value
            props.inputHandler(q)
            props.searchHandler(q)
            setInputValue(q)
          }}
        ></input>
        {inputValue !== '' && (
          <span
            className={`material-symbols-outlined clear-button ${theme}`}
            onClick={() => {
              clearInput()
              props.searchHandler('')
              props.inputHandler('')
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
