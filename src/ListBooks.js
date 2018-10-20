import React, { Component } from "react";
import Book from "./Book.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class ListBooks extends Component {
  getBooksByShelf = shelf => {
    const booksOnShelf = this.props.books.filter(book => book.shelf === shelf);
    return booksOnShelf;
  };

  updateBook = (book, shelf) => {
    this.props.onUpdateBook(book, shelf);
  };

  getBookShelf = (shelf = "none") => {
    return shelf;
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.getBooksByShelf("currentlyReading").map(book => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        shelf={this.getBookShelf(book.shelf)}
                        onUpdateBook={this.updateBook}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.getBooksByShelf("wantToRead").map(book => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        shelf={this.getBookShelf(book.shelf)}
                        onUpdateBook={this.updateBook}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.getBooksByShelf("read").map(book => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        shelf={this.getBookShelf(book.shelf)}
                        onUpdateBook={this.updateBook}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired
};
