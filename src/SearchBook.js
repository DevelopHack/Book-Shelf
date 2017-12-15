import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBook extends Component {
    constructor(props){
        super(props);
        this.state = { query: props.value }

        this.updateQuery = this.updateQuery.bind(this)
        this.updateQuery = debounce(this.updateQuery,1000)
    }   
    /**
     * @description Parameter validation
     */
    static propTypes = {
        onUpdateBook: PropTypes.func.isRequired,
        foundBooks: PropTypes.array.isRequired
    }    
    /**
     * @description Update state and search the books that match the query
     * @param {string} query
     */
    updateQuery = (query) => { 
        this.setState({ query: query.trim() })
    }    
    /**
     * @description Invoke immediately after updating occurs
     * @param {object} prevProps 
     * @param {object} prevState 
     */
    componentDidUpdate(prevProps, prevState){   
        if(prevState.query !== this.state.query)
        {
           this.props.onSearch(this.state.query)
        }
    }
    render(){
        const {onUpdateBook, foundBooks}=this.props                  
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
                                
                    <input 
                        type="text" 
                        placeholder="Search by title or author"
                        value={this.props.value}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />                    
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