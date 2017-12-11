import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired
    }
    /**
     * @description Execute the method updateBook
     */
    handleUpdate = (event) => {
        const value = event.target.value        
        if(this.props.onUpdateBook){
            this.props.onUpdateBook(this.props.book, value)
        }    
    }    
    render(){        
        const {book}=this.props
        return(
            <li className="animate-initial">   
                <div className="book animate-zoom">
                    <div className="book-top">
                        <div 
                            className="book-cover" 
                            style={{ 
                                width: 128, 
                                height: 193, 
                                backgroundImage: `url(${book.imageLinks.thumbnail})`}}
                        ></div>
                        <div className="book-shelf-changer book-select">
                        <select 
                            value={book.shelf ? book.shelf : "none"}                            
                            onChange={this.handleUpdate}                            
                        >
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors ? (
                         book.authors.map((author, index) => (
                            <div key={index} className="book-authors">{author}</div>
                        ))  
                    ):(<div className="book-authors">Author Unknow</div>)
                    }                    
                    {book.averageRating ? (
                        <div className="book-title">
                            <span className="checked">{book.averageRating} </span>
                            <span className="fa fa-star checked">S</span>                            
                        </div>   
                    ):(
                        <div className="book-title">
                            <span className="checked">No </span>
                            <span className="fa fa-star-o checked">S</span>                            
                        </div>  
                    )}                                                
                </div>                  
            </li> 
        )
    }
}
export default Book