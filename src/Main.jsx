import React, { Component } from "react";
import axios from "axios";

export default class Main extends Component {
  state = {
    searchQuery: "",
    searchResult: null,
  };

  updateSearchQuery = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.loadBookData();
    }
  }

  loadBookData = () => {
    if (this.state.searchQuery !== "") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            this.state.searchQuery.replace(" ", "+")
        )
        .then((response) => {
          this.setState({ searchResult: response.data });
        })
        .catch((error) => console.log(error));
    } else {
      this.setState({ searchResult: null });
    }
  };

  render() {
    return (
      <div className="container">
        <header className="text-center py-4">
          <h1>Book search</h1>

          <input
            className="form-control mx-auto shadow"
            type="search"
            placeholder="Search books by name or author"
            onChange={this.updateSearchQuery}
          />
        </header>
        <main>
          {this.state.searchResult ? (
            <span className="text-reset">
              {`${this.state.searchResult.totalItems} search results with query "${this.state.searchQuery}"`}
            </span>
          ) : null}
          {this.state.searchResult ? (
            <ul className="list-unstyled">
              {this.state.searchResult.items.map((book, index) => (
                <li key={index} className="media border-bottom py-3">
                  <img
                    src={
                      book.volumeInfo.imageLinks
                        ? book.volumeInfo.imageLinks.thumbnail
                        : "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                    }
                    className="mr-3 img-fluid img-thumbnail"
                    style={{ width: "128px" }}
                    alt={book.volumeInfo.title}
                  />
                  <div className="media-body d-flex flex-column align-self-baseline">
                    <h5 className="mt-0 mb-1">
                      {book.volumeInfo.title}
                      {book.volumeInfo.authors ? (
                        <small> by {book.volumeInfo.authors.join(", ")} </small>
                      ) : null}
                    </h5>
                    <p className="text-justify" style={{ maxHeight: "90px", overflowY: "hidden" }}>
                      {book.volumeInfo.description}
                    </p>
                    <div className="">
                      {book.volumeInfo.previewLink ? (
                        <a
                          className="btn btn-secondary btn-sm"
                          target="_blank"
                          rel="noreferrer"
                          href={book.volumeInfo.previewLink}
                          role="button"
                        >
                          Preview
                        </a>
                      ) : null}
                      {book.volumeInfo.infoLink ? (
                        <a
                          className="btn btn-primary btn-sm ml-2"
                          target="_blank"
                          rel="noreferrer"
                          href={book.volumeInfo.infoLink}
                          role="button"
                        >
                          Info
                        </a>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </main>
      </div>
    );
  }
}
