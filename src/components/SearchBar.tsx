function SearchBar(props: {
  placeholder: string
  searchHandler: (q: string) => void
  inputHandler: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <>
      {' '}
      <div className="searchbar-container">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <span className="material-symbols-outlined">search</span>
        <input
          id="input"
          className="searchbar-input"
          placeholder={props.placeholder}
          onInput={(e) => {
            const q = e.currentTarget.value
            props.inputHandler(q)
            props.searchHandler(q)
          }}
        ></input>
      </div>
    </>
  )
}

export default SearchBar
