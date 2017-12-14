import React from 'react'
import Book from './Book'

const Shelf = ({title, books, onUpdateBook}) => {
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map((book, index) => <Book onUpdateBook={onUpdateBook} book={book} key={index}/>)}
            </ol>
            </div>
        </div>
    )
}
export default Shelf