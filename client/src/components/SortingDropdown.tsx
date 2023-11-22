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
  const possibleFilterParams: string[] = [
    'name-asc',
    'name-desc',
    'difficulty-asc',
    'difficulty-desc',
  ]

  return (
    <div className="dropdown-wrapper">
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
      >
        {possibleFilterParams.map((p, idx) => {
          return (
            <option value={p} key={idx}>
              {p.split('-')[0].charAt(0).toUpperCase() +
                p.split('-')[0].slice(1) +
                ' - ' +
                p.split('-')[1].toUpperCase()}
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
