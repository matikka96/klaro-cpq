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
      <div className="container" style={{ maxWidth: "800px" }}>
        <header className="text-center py-4">
          <h1 className="py-2">Book search</h1>

          <div className="input-group shadow">
            <input
              type="text"
              className="form-control"
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
                  className="btn btn-outline-primary"
                  onClick={this.loadBookData}
                  disabled={this.state.searchField === "" ? true : false}
                >
                  {this.state.dataLoading ? (
                    <span className="spinner-border spinner-border-sm mr-2"></span>
                  ) : null}
                  Search
                </button>
              </div>
            ) : null}
          </div>
        </header>
        <main>
          {this.state.searchResult ? (
            <>
              <span className="text-reset">
                {`${this.state.searchResult.totalItems} search results with "${this.state.searchQuery}"`}
              </span>
              {this.state.searchResult.items.length > 0 ? (
                <div>
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
                              <small className="font-italic">
                                {" "}
                                by {book.volumeInfo.authors.join(", ")}{" "}
                              </small>
                            ) : null}
                          </h5>
                          <p
                            className="text-justify text-dark"
                            style={{ maxHeight: "95px", overflowY: "hidden" }}
                          >
                            {book.volumeInfo.description}
                          </p>
                          <ul className="list-unstyled">
                            {book.volumeInfo.previewLink ? (
                              <li>
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={book.volumeInfo.previewLink}
                                >
                                  Open preview
                                </a>
                              </li>
                            ) : null}
                            {book.volumeInfo.infoLink ? (
                              <li>
                                <a target="_blank" rel="noreferrer" href={book.volumeInfo.infoLink}>
                                  More info
                                </a>
                              </li>
                            ) : null}
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="row">
                    <button
                      type="button"
                      className="btn btn-secondary my-3 mx-auto"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Go to top
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </main>
      </div>
    );
  }
}
