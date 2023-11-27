import { useTheme } from '../hooks/ThemeContext'
import './PageNavigation.css'

interface PageNavigationProps {
  currentPage: number
  isLastPage: boolean
  drinksOnPage: number
  onChangePage: (a: number) => void
}
const PageNavigation = (props: PageNavigationProps) => {
  const theme = useTheme()

  const isFirstPage = () => {
    return props.currentPage === 1
  }

  const isLastPage = () => {
    return props.isLastPage || props.drinksOnPage < 12
  }

  return (
    <div className="page-navigation">
      <div
        tabIndex={isFirstPage() ? undefined : 0}
        className={`page-button ${isFirstPage() && 'disabled'} ${theme}`}
        onClick={() => {
          if (!isFirstPage()) props.onChangePage(-1)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isFirstPage()) props.onChangePage(-1)
        }}
      >
        <span className={`material-symbols-outlined button-arrow ${theme}`}>chevron_left</span>
        Previous
      </div>
      Page {props.currentPage}
      <div
        tabIndex={isLastPage() ? undefined : 0}
        className={`page-button ${isLastPage() && 'disabled'} ${theme}`}
        onClick={() => {
          if (!isLastPage()) props.onChangePage(1)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isLastPage()) props.onChangePage(1)
        }}
      >
        Next
        <span className={`material-symbols-outlined button-arrow ${theme}`}>chevron_right</span>
      </div>
    </div>
  )
}

export default PageNavigation
