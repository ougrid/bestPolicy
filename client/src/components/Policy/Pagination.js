import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate,changePage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button type="button" className="btn btn-secondary page-link" name={number} onClick={(e)=>changePage(e)} >
              {number}
              </button>
            {/* <a onClick={() => paginate(number)}  href='/policyexcel' className='page-link'>
              {number}
            </a> */}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;