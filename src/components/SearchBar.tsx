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
    ;(document.getElementById('input') as HTMLInputElement).value = ''
    setInputValue('')
  }

  return (
    <>
      <div className="searchbar-container">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <span className="material-symbols-outlined">search</span>
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
            className="material-symbols-outlined clear-button"
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
