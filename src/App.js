import React from "react";
import * as BooksAPI from "./BooksAPI";
import Books from "./Books";
import { Route, Link } from "react-router-dom";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({ books: books }));
    });
  };

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(books => {
      // console.log(books);
      // this.setState(currentBooks => ({
      //   books: currentBooks.books.map(b => {
      //     if (b.id === book.id) b.shelf = shelf;
      //     return b;
      //   })
      // }));
      this.getAllBooks();
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">
                  Close
                </Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid" />
              </div>
            </div>
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <Books
                        books={this.state.books}
                        shelf="currentlyReading"
                        onUpdateBook={this.updateBook}
                      />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <Books
                        books={this.state.books}
                        shelf="wantToRead"
                        onUpdateBook={this.updateBook}
                      />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <Books
                        books={this.state.books}
                        shelf="read"
                        onUpdateBook={this.updateBook}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
