import React from 'react'
import { Route } from 'react-router-dom'
import ListShelves from './ListShelves'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  /**
   * @constructor Represent BooksApp
   */
  constructor(){
    super();
    this.state = {
      books: [],
      foundBooks: [],
      isUpdate: false,  
    }
    this.searchBooks = this.searchBooks.bind(this)
    this.updateBook = this.updateBook.bind(this)
  }  
  /**
   * @description Invoke immediately after the component is inserted in the DOM
   */
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  /**
   * @description Invoke immediately after updating occurs
   * @param {object} prevProps 
   * @param {object} prevState 
   */
  componentDidUpdate(prevProps, prevState){
    if(this.state.foundBooks === prevState.foundBooks && this.state.isUpdate === prevState.isUpdate)
    { 
      this.cleanFoundBooks()
      this.setState({isUpdate: true})  
    }
  }
  /**
   * @description Search the books that match the query
   * @param {string} query The query of the search
   */
  searchBooks(query){
    this.cleanFoundBooks()
    if(query !== '')
    {    
      BooksAPI.search(query).then((foundBooks) => {
        if(foundBooks !== undefined)
          this.updateFoundBook(foundBooks)
      })
    }    
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
  updateBook(book, shelf){
    this.setState({
      currentlyReadingBooks: [],
      wantToReadBooks: [],
      readBooks: [],
      isUpdate: false    
    })
    if(book.shelf !== shelf){
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState((prevState) =>({
          books: prevState.books.filter(b => b.id !== book.id).concat([ book ]),
          isUpdate: true
        }))
      })
    }  
  }  
  render(){
    return(      
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBook 
            foundBooks={this.state.foundBooks} 
            onSearch={this.searchBooks}
            onUpdateBook={this.updateBook}           
          />
        )}/>
        <Route exact path="/" render={() => (          
          <ListShelves 
            books={this.state.books}            
            onUpdateBook={this.updateBook} 
          />
        )}/>       
      </div>
    )
  }
}
export default BooksApp
