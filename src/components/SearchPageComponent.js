import React from 'react';
import {Link} from  'react-router-dom';
import BookShelfComponent from './BookShelfComponent';

function SearchPageComponent(props){        
    return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link className="close-search" to='/' >Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(event)=>{props.searchBooks(event.target.value)}}/>

              </div>              
            </div>
            <div className="search-books-results">
                <BookShelfComponent books={props.books} updateBookShelf={props.updateBookShelf}/> 
            </div>
          </div>
    )
}

export default SearchPageComponent;