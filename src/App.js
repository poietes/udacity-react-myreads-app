import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
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
      this.getAllBooks();
      // this.setState(currentBooks => ({
      //   books: currentBooks.books.map(b => {
      //     if (b.id === book.id) b.shelf = shelf;
      //     return b;
      //   })
      // }));
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={this.state.books}
              onUpdateBook={this.updateBook}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              books={this.state.books}
              onUpdateBook={this.updateBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
