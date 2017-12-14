import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

class ListShelves extends Component {  
  static propTypes = {
    onUpdateBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }  
  render(){
    const {onUpdateBook, books}=this.props
    const currentlyReadingBooks = books.filter(book => book.shelf === "currentlyReading")
    const wantToReadBooks = books.filter(book => book.shelf === "wantToRead")
    const readBooks = books.filter(book => book.shelf === "read")
    return(
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>  
        </div>
        <div className="list-books-content">
          <div>            
            <Shelf books={currentlyReadingBooks} title={"Currently Reading"} onUpdateBook={onUpdateBook}/>
            <Shelf books={wantToReadBooks} title={"Want to Read"} onUpdateBook={onUpdateBook}/>
            <Shelf books={readBooks} title={"Read"} onUpdateBook={onUpdateBook}/>            
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