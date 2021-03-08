import React from 'react';
import {Link} from 'react-router-dom';
import BookShelfComponent from './BookShelfComponent';

function MainPageComponent(props){
    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">        
          <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                    <BookShelfComponent books={props.currentlyReadingBooks} updateBookShelf={props.updateBookShelf}/> 
              </div>
          </div>
          <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                  <BookShelfComponent books={props.wantToReadBooks} updateBookShelf={props.updateBookShelf}/> 
                  </div>                  
          </div>
          <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">  
                  <BookShelfComponent books={props.readBooks} updateBookShelf={props.updateBookShelf}/> 
                  </div>                
           </div>            
            <div className="open-search">
              <Link className="open-search" to='/search'>Add a book</Link>
            </div>
        </div>
        </div>
          

    )
}

export default MainPageComponent;