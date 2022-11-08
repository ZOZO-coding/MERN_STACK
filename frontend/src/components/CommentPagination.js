import React from 'react'

const CommentPagination = ({ page, pageCount, setPage, setPageCount }) => {

    const pages = new Array(pageCount).fill(null).map((v, i) => i);
    
    const handlePrevious = () => {
        setPage((p) => {
            if (p === 1) return p;
            return p - 1;
        })
    }

    const handleNext = () => {
        setPage((p) => {
            if (p === pageCount) return p;
            return p + 1;
        })
    }

    const handleClick = (e) => {
        setPage(e.target.innerText)
    }

    return (
        <footer className='pagination'>
            <button disabled={page === 1} onClick={handlePrevious}>Previous</button>
            {pages.map((pageIndex) => (
                <button 
                    key={pageIndex}
                    onClick={handleClick}
                    className={pageIndex + 1 === page ? "active" : ""}
                > 
                    {pageIndex + 1}
                </button>
            ))}
            <button disabled={page === pageCount} onClick={handleNext}>Next</button>
        </footer>
    )
}

export default CommentPagination