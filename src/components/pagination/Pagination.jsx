import { useState } from 'react';
import styles from './Pagination.module.scss'

const Pagination = ({ currentPage, setCurrentPage, productsPerPage, totalProducts }) => {

  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage
  //Limit the page numbers shown
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i)
  }

  //Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  //Go to next page

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
    //Show next set of pageNumbers
    if (currentPage + 1 > pageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  //Go to previous page
  const previousPage = () => {
    setCurrentPage(currentPage - 1)
    //Show prev set of pageNumbers
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }

  }



  return (
    <ul className={styles.pagination}>
      <li
        onClick={previousPage}
        style={currentPage === 1 ? { display: "none" } : { display: "inline" }}>
        Prev
      </li>
      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              className={currentPage === number ? `${styles.active}` : null}
              onClick={() => paginate(number)}
              key={number}>
              {number}
            </li>
          )
        }

      })}
      <li
        onClick={nextPage}
        style={currentPage === pageNumbers.length ? { display: "none" } : { display: "inline" }}>
        Next
      </li>
      <p>
        <b className={styles.page}>
          {`page ${currentPage}`}
        </b>
        <span> of</span>
        <b>{` ${Math.ceil(totalPages)}`}</b>
      </p>

    </ul>
  )
}

export default Pagination