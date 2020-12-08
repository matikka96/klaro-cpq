import React, { Component } from "react";
import axios from "axios";

export default class Main extends Component {
  state = {
    searchField: "",
    searchQuery: "",
    searchResult: null,
    dataLoading: false,
  };

  updateSearchField = (e) => this.setState({ searchField: e.target.value });

  loadBookData = () => {
    if (this.state.searchField !== "") {
      this.setState({ dataLoading: true, searchQuery: this.state.searchField }, () => {
        axios
          .get(
            "https://www.googleapis.com/books/v1/volumes?q=" +
              this.state.searchQuery.replace(" ", "+")
          )
          .then((response) => {
            this.setState({ searchResult: response.data, dataLoading: false });
          })
          .catch((error) => console.log(error));
      });
    } else alert("Please, type something");
  };

  render() {
    return (
      <div className="container grid-md">
        <header className="columns">
          <div className="column">
            {/* <h1 className="my-2 text-center">Book search</h1> */}
            <div class="hero hero-sm">
              <div class="hero-body">
                <h1 className="my-2 text-center">Book search</h1>
              </div>
            </div>

            <div className="input-group">
              <input
                type="text"
                className="form-input"
                placeholder="Search books by name or author"
                autoFocus
                onKeyUp={(e) => {
                  this.updateSearchField(e);
                  if (e.key === "Enter") {
                    this.loadBookData();
                  }
                }}
              />
              {this.state.searchField !== "" ? (
                <div className="input-group-append">
                  <button
                    className={`btn btn-primary input-group-btn ${
                      this.state.dataLoading ? "loading" : ""
                    }`}
                    onClick={this.loadBookData}
                    disabled={this.state.searchField === "" ? true : false}
                  >
                    Search
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main className="columns">
          {this.state.searchResult ? (
            <div className="column">
              <p className="py-2 m-0">
                {`${this.state.searchResult.totalItems} search results with "${this.state.searchQuery}"`}
              </p>
              {this.state.searchResult.items.length > 0 ? (
                <div>
                  {this.state.searchResult.items.map((book, index) => (
                    <div key={index}>
                      <div className="tile py-2">
                        <div className="tile-icon">
                          <div className="example-tile-icon">
                            <img
                              src={
                                book.volumeInfo.imageLinks
                                  ? book.volumeInfo.imageLinks.thumbnail
                                  : "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                              }
                              className="icon icon-file centered"
                              style={{ width: "128px" }}
                              alt={book.volumeInfo.title}
                            />
                          </div>
                        </div>
                        <div className="tile-content">
                          <h4 className="tile-title mb-1">
                            {book.volumeInfo.title}
                            {book.volumeInfo.authors ? (
                              <small className="font-italic">
                                {` by ${book.volumeInfo.authors.join(", ")}`}
                              </small>
                            ) : null}
                          </h4>
                          <p className="tile-subtitle my-2">{book.volumeInfo.description}</p>

                          <a target="_blank" rel="noreferrer" href={book.volumeInfo.previewLink}>
                            Open preview
                          </a>
                          <span className="mx-2">|</span>
                          <a target="_blank" rel="noreferrer" href={book.volumeInfo.infoLink}>
                            More info
                          </a>
                        </div>
                      </div>
                      <div className="divider"></div>
                    </div>
                  ))}

                  <div className="columns">
                    <div className="column my-2">
                      <button
                        type="button"
                        className="btn btn-secondary p-centered"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        Go to top
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </main>
      </div>
    );
  }
}
