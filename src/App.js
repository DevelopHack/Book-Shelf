import React from 'react'
import { Route } from 'react-router-dom'
import ListShelves from './ListShelves'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  /**
   * @constructor Represent BooksApp
   * @param {props} props 
   */
  constructor(props){
    super(props);
    this.state = {
      books: [],
      foundBooks: [],
      currentlyReadingBooks: [],
      wantToReadBooks: [],
      readBooks: []
    }
    this.searchBooks = this.searchBooks.bind(this)
    this.updateBook = this.updateBook.bind(this)
  }
  /**
   * @description Invoke immediately after the component is inserted in the DOM
   */
  componentDidMount(){
    this.initializeData()
  }
  /**
   * @description Invoke whenever the component is about to recieve brand new props
   */
  componentWillReceiveProps(){
    this.cleanFoundBooks()
  }
  /**
   * @description Get all of books currently in the bookshelves
   */
  initializeData(){
    BooksAPI.getAll().then((books) => {
      this.rebuildArrays(books)
      this.setState({ books })
    })   
  }
  /**
   * @description Rebuild the array of books in each shelf
   * @param {array} books Array of books
   */ 
  rebuildArrays(books){    
    books.forEach(book => {
      if(book.shelf === "currentlyReading"){
        this.setState(prevState =>({
          currentlyReadingBooks: prevState.currentlyReadingBooks.concat([book])
        }))              
      }else if(book.shelf === "wantToRead"){
        this.setState(prevState =>({
          wantToReadBooks: prevState.wantToReadBooks.concat([book])
        }))      
      }else if(book.shelf === "read"){
        this.setState(prevState =>({
          readBooks: prevState.readBooks.concat([book])
        }))        
      }
    })
  }
  /**
   * @description Search the books that match the query
   * @param {string} query The query of the search
   */
  searchBooks(query){
    this.cleanFoundBooks() 
    BooksAPI.search(query).then((foundBooks) => {
      this.updateFoundBook(foundBooks)
    })
  }
  /**
   * @description Update the array of found books 
   * @param {array} booksSearch Array of books
   */
  updateFoundBook(foundBooks){
    let tempBooksIqual = []
    let tempBooksSearch = []
    for(let i = 0; i < foundBooks.length; i++){  
      let a = this.state.books.find(book => book.id === foundBooks[i].id)  
      if(a)
      {  
        tempBooksIqual = tempBooksIqual.concat([a])
      }
      else
      { tempBooksSearch = tempBooksSearch.concat([foundBooks[i]])}
    }    
    this.setState(prevState => ({
      foundBooks: prevState.foundBooks.concat(tempBooksIqual,tempBooksSearch)
    }))
  }
  /**
   * @description Update state 
   */
  cleanFoundBooks(){    
    this.setState({
      foundBooks: []
    })
  }
  /**
   * @description Update the book with a new shelf
   * @param {object} book - The book object
   * @param {string} shelf - The new shelf 
   */
  updateBook(book,shelf){
    this.setState({
      currentlyReadingBooks: [],
      wantToReadBooks: [],
      readBooks: [],
      books: []     
    }) 
    BooksAPI.update(book,shelf)
    this.initializeData()
    this.cleanFoundBooks()
  }
  render(){
    return(      
      <div className="app">
        <Route path="/search" render={({history}) => (
          <SearchBook 
            foundBooks={this.state.foundBooks} 
            onSearch={this.searchBooks}
            onUpdateBook={(book, shelf) =>{
              this.updateBook(book,shelf)              
              history.push('/')
            }} 
          />
        )}/>
        <Route exact path="/" render={() => (          
          <ListShelves 
            currentlyReadingBooks={this.state.currentlyReadingBooks}
            wantToReadBooks={this.state.wantToReadBooks}
            readBooks={this.state.readBooks}
            onUpdateBook={this.updateBook} 
          />
        )}/>       
      </div>
    )
  }
}
export default BooksApp
