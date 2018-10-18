import React, { Component } from "react";

export default class Books extends Component {
  render() {
    const { books, shelf, onUpdateBook } = this.props;
    const showingBooks = books.filter(book => book.shelf === shelf);

    return (
      <ol className="books-grid">
        {showingBooks.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 192,
                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                  }}
                />
                <div className="book-shelf-changer">
                  <select onChange={e => onUpdateBook(book, e.target.value)}>
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}
