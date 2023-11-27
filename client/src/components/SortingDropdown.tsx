import { useTheme } from '../hooks/ThemeContext'
import './Dropdown.css'

function FilterDropdown(props: {
  value: string
  label: string
  changeHandler: (s: string) => void
  pageHandler: () => void
  lastPageHandler: (b: boolean) => void
}) {
  const theme = useTheme()

  interface filterParam {
    value: string
    label: string
  }

  const possibleFilterParams: filterParam[] = [
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'difficulty-asc', label: 'Difficulty (easiest first)' },
    { value: 'difficulty-desc', label: 'Difficulty (hardest first)' },
  ]

  return (
    <div className="dropdown-wrapper sort">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <label htmlFor="sort-parameter">{props.label}</label>
      <select
        id="sort-parameter"
        value={props.value}
        onChange={(e) => {
          props.changeHandler(e.target.value)
          props.pageHandler()
          props.lastPageHandler(false)
        }}
        className={`dropdown ${theme}`}
        data-testid="sorting"
      >
        {possibleFilterParams.map((p, idx) => {
          return (
            <option value={p.value} key={idx}>
              {p.label}
            </option>
          )
        })}
      </select>
      {props.value !== '' && (
        <span
          className={`material-symbols-outlined clear-button ${theme}`}
          onClick={() => {
            props.changeHandler('')
            props.pageHandler()
            props.lastPageHandler(false)
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              props.changeHandler('')
              props.pageHandler()
              props.lastPageHandler(false)
            }
          }}
        >
          close
        </span>
      )}
    </div>
  )
}

export default FilterDropdown
