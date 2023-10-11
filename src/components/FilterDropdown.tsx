import './Dropdown.css'

function FilterDropdown(props: {
  value: string
  label: string
  changeHandler: React.Dispatch<React.SetStateAction<string>>
}) {
  const possibleFilterParams: string[] = [
    '',
    'vodka',
    'gin',
    'whisky',
    'tequila',
    'rum',
  ]

  return (
    <>
      <div className="dropdown-container">
        <label htmlFor="filter-parameter">{props.label}</label>
        <select
          id="filter-parameter"
          value={props.value}
          onChange={(e) => {
            props.changeHandler(e.target.value)
          }}
        >
          {possibleFilterParams.map((p, idx) => {
            return (
              <option value={p} key={idx}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            )
          })}
        </select>
      </div>
    </>
  )
}

export default FilterDropdown
