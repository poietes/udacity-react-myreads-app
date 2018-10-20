import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

export default class SearchBooks extends Component {
  state = {
    books: []
  };

  searchBooks = e => {
    if (e.target.value !== undefined && e.target.value.length > 0) {
      const query = e.target.value.trim();
      BooksAPI.search(query)
        .then(books => {
          this.setState(() => ({ books: books }));
        })
        .catch(() => {
          this.setState(() => ({ books: [] }));
        });
    } else {
      this.setState(() => ({ books: [] }));
    }
  };

  updateBook = (book, shelf) => {
    this.props.onUpdateBook(book, shelf);
  };

  findBook = book => {
    let found = this.props.books.find(b => {
      return b.id === book.id;
    });

    return found;
  };

  getBookShelf = book => {
    const fb = this.findBook(book);
    let shelf = fb !== undefined ? fb.shelf : "none";
    shelf === undefined && (shelf = "none");

    return shelf;
  };

  render() {
    const { books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.searchBooks(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelf={this.getBookShelf(book)}
                  onUpdateBook={this.updateBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired
};
