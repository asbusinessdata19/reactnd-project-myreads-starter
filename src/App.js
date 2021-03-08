import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPageComponent from './components/SearchPageComponent';
import MainPageComponent from './components/MainPageComponent';
import LoadingMask from './components/LoadingMask';
import {Route} from 'react-router-dom';


class BooksApp extends React.Component {
  constructor(){
    super();
    this.searchBooks = this.searchBooks.bind(this);
    this.updateBookShelf = this.updateBookShelf.bind(this);
    this.getBooks = this.getBooks.bind(this);
    let allBooks = [];    
    let readBooks = [];
    let currentlyReadingBooks =[];
    let wantToReadBooks = [];    
    this.state ={
        allBooks:allBooks,
        filteredBooks:allBooks,
        readBooks:readBooks,
        currentlyReadingBooks:currentlyReadingBooks,
        wantToReadBooks:wantToReadBooks,
        loading:true      
      };    
  }

  updateBookShelf=function(book,shelf){
    this.setState(()=>({
      loading:true
    }));
    BooksAPI.update(book,shelf).then(()=>{
      this.getBooks();
    });
  }

  componentDidMount(){
     this.getBooks();
  }

  getBooks(){
    BooksAPI.getAll().then((books)=>{    
      let readBooks = [];
      let currentlyReadingBooks =[];
      let wantToReadBooks = [];
      for(let book of books)  {
        if(book.shelf!==undefined && book.shelf==='currentlyReading'){
          currentlyReadingBooks.push(book);
        }else if(book.shelf!==undefined && book.shelf==='wantToRead'){
          wantToReadBooks.push(book);
        }else if(book.shelf!==undefined && book.shelf==='read'){
          readBooks.push(book);
        }
      }
      this.setState(()=>{                
        return {
          allBooks:books,
          filteredBooks:books,
          readBooks:readBooks,
          currentlyReadingBooks:currentlyReadingBooks,
          wantToReadBooks:wantToReadBooks,
          loading:false
        }
      })
    });  
  }

  searchBooks=function(query){
    if(query!==undefined && query.trim()!==''){
      this.setState(()=>({
        loading:true
      }));
      BooksAPI.search(query).then((books)=>{        
        this.setState(()=>{
          return{
            filteredBooks:books,
            loading:false,
          }
        })
    });   
    }else{
      this.setState((prevState)=>{
        return{
          filteredBooks:prevState.allBooks
        }
      })
    }       
  }
  

  render() {    
    let filteredBooks = this.state.filteredBooks;
    let readBooks = this.state.readBooks;
    let currentlyReadingBooks=this.state.currentlyReadingBooks;
    let wantToReadBooks=this.state.wantToReadBooks;
    if(this.state.loading){      
      document.body.style.overflow='hidden';
    }else{
      document.body.style.overflow='auto';
    }
    return (      
      <div className='app'>
        {this.state.loading && <LoadingMask/>}
        <Route exact path='/' render={()=>{
          return <MainPageComponent readBooks={readBooks} currentlyReadingBooks={currentlyReadingBooks} wantToReadBooks={wantToReadBooks} updateBookShelf={this.updateBookShelf}/>;                   
        }}/>
        <Route path='/search' render={()=>{          
          return  <SearchPageComponent books={filteredBooks} searchBooks={this.searchBooks} updateBookShelf={this.updateBookShelf}/>;
        }}/>              
      </div>
    );
  }
}

export default BooksApp
