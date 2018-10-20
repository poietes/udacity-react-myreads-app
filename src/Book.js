import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Book extends Component {
  state = {
    shelf: this.props.shelf
  };

  render() {
    const { book, onUpdateBook } = this.props;
    const { shelf } = this.state;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${
                book.imageLinks !== undefined ? book.imageLinks.thumbnail : ""
              })`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={shelf}
              onChange={e => {
                onUpdateBook(book, e.target.value);
                this.setState({ shelf: e.target.value });
              }}
            >
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
        <div className="book-authors">
          {book.authors !== undefined && book.authors.join(", ")}
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelf: PropTypes.string.isRequired,
  onUpdateBook: PropTypes.func.isRequired
};
