import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBook extends Component {
    static propTypes = {
        onUpdateBook: PropTypes.func.isRequired,
        foundBooks: PropTypes.array.isRequired
    }
    state = {
        query: ''
    }
    /**
     * @description Update state
     * @param {string} query
     */
    updateQuery = (query) => {
        this.setState({ query })
    }
    /**
     * @description Execute the method searchBooks
     */
    handleSubmit = (event) => {        
        event.preventDefault()
        if(this.props.onSearch)
            this.props.onSearch(this.state.query)
    }
    render(){
        const {onUpdateBook, foundBooks}=this.props
        const {query}=this.state 
        return(
            <div className="search-books">
            <div className="search-books-bar">
                <Link
                    to={{pathname: "/"}}
                    className="close-search"
                >
                    Close
                </Link>                
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </form>
                </div>
            </div>
            <div className="search-books-results">
                {!foundBooks.error && (
                    <ol className="books-grid"> 
                        {foundBooks.map((book, index) => <Book key={index} book={book} onUpdateBook={onUpdateBook}/>)}
                    </ol>
                )}             
            </div>
          </div>
        )    
    }
}
export default SearchBook