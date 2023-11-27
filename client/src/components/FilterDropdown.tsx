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
  const possibleFilterParams: string[] = ['', 'vodka', 'gin', 'whisky', 'tequila', 'rum']

  return (
    <div className="dropdown-wrapper filter">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <label htmlFor="filter-parameter">{props.label}</label>
      <select
        id="filter-parameter"
        value={props.value}
        onChange={(e) => {
          props.changeHandler(e.target.value)
          props.pageHandler()
          props.lastPageHandler(false)
        }}
        className={`dropdown ${theme}`}
      >
        {possibleFilterParams.map((p, idx) => {
          return (
            <option value={p} key={idx} data-testid={`option-${p}`}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          )
        })}
      </select>
      {props.value !== '' && (
        <span
          className={`material-symbols-outlined clear-button ${theme}`}
          data-testid="close-filter-button"
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
