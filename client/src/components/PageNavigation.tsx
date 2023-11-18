import { useTheme } from '../hooks/ThemeContext'

interface PageNavigationProps {
  currentPage: number
  isLastPage: boolean
  onChangePage: (a: number) => void
}

const PageNavigation = (props: PageNavigationProps) => {
  const theme = useTheme()

  return (
    <div className="page-navigation">
      <div
        className={`page-button ${props.currentPage === 1 && 'disabled'} ${theme}`}
        onClick={() => props.onChangePage(-1)}
      >
        <span className={`material-symbols-outlined button-arrow ${theme}`}>chevron_left</span>
        Previous
      </div>
      Page {props.currentPage}
      <div
        className={`page-button ${props.isLastPage && 'disabled'} ${theme}`}
        onClick={() => props.onChangePage(1)}
      >
        Next
        <span className={`material-symbols-outlined button-arrow ${theme}`}>chevron_right</span>
      </div>
    </div>
  )
}

export default PageNavigation
