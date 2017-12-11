import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class ListShelves extends Component {
  static propTypes = {
    onUpdateBook: PropTypes.func.isRequired,
    currentlyReadingBooks: PropTypes.array.isRequired,
    wantToReadBooks: PropTypes.array.isRequired,
    readBooks: PropTypes.array.isRequired
  }
  render(){
    const {onUpdateBook, currentlyReadingBooks, wantToReadBooks, readBooks}=this.props 
    return(
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>  
        </div>
        <div className="list-books-content">
          <div>            
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                    {currentlyReadingBooks.map((book, index) => <Book onUpdateBook={onUpdateBook} book={book} key={index}/>)}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks.map((book, index) => <Book onUpdateBook={onUpdateBook} book={book} key={index}/>)}                
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks.map((book, index) => <Book onUpdateBook={onUpdateBook} book={book} key={index}/>)}  
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
            <Link
                to="/search"
            >
                Add a book
            </Link>        
        </div>
      </div>
    )
  }
}
export default ListShelves