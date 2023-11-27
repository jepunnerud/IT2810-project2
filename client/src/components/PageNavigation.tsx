import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/ThemeContext'
import './PageNavigation.css'

interface PageNavigationProps {
  currentPage: number
  totalPages: number
  onChangePage: (a: number) => void
}
const PageNavigation = (props: PageNavigationProps) => {
  const theme = useTheme()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const breakPoint = 742

  useEffect(() => {
    // Update the window width whenever the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    // Add a window resize event listener
    window.addEventListener('resize', handleResize)
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [windowWidth])

  const isFirstPage = () => {
    return props.currentPage === 1
  }

  const isLastPage = () => {
    return props.currentPage === props.totalPages
  }

  return (
    <div className="page-navigation">
      {windowWidth > breakPoint && (
        <div
          tabIndex={isFirstPage() ? undefined : 0}
          className={`page-button ${isFirstPage() && 'disabled'} ${theme}`}
          onClick={() => {
            if (!isFirstPage()) props.onChangePage(-props.currentPage + 1)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isFirstPage()) props.onChangePage(-props.currentPage + 1)
          }}
        >
          <span className={`material-symbols-outlined button-arrow ${theme}`}>chevron_left</span>
          Go to page 1
        </div>
      )}
      <div className="button-wrapper">
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
      {windowWidth > breakPoint && (
        <div
          tabIndex={isLastPage() ? undefined : 0}
          className={`page-button ${isLastPage() && 'disabled'} ${theme}`}
          onClick={() => {
            if (!isLastPage()) props.onChangePage(props.totalPages - props.currentPage)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isLastPage())
              props.onChangePage(props.totalPages - props.currentPage)
          }}
        >
          Go to page {props.totalPages}
          <span className={`material-symbols-outlined button-arrow ${theme}`}>chevron_right</span>
        </div>
      )}
      {windowWidth <= breakPoint && (
        <div className="button-wrapper">
          <div
            tabIndex={isFirstPage() ? undefined : 0}
            className={`page-button ${isFirstPage() && 'disabled'} ${theme}`}
            onClick={() => {
              if (!isFirstPage()) props.onChangePage(-props.currentPage + 1)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isFirstPage()) props.onChangePage(-props.currentPage + 1)
            }}
          >
            <span className={`material-symbols-outlined button-arrow ${theme}`}>chevron_left</span>
            Go to page 1
          </div>
          <div
            tabIndex={isLastPage() ? undefined : 0}
            className={`page-button ${isLastPage() && 'disabled'} ${theme}`}
            onClick={() => {
              if (!isLastPage()) props.onChangePage(props.totalPages - props.currentPage)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLastPage())
                props.onChangePage(props.totalPages - props.currentPage)
            }}
          >
            Go to page {props.totalPages}
            <span className={`material-symbols-outlined button-arrow ${theme}`}>chevron_right</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default PageNavigation
