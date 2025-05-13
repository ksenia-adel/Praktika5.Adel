import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./pagesCSS/MainPage.css";

function MainPage() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // load all books from API
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        const loadedBooks = response.data.books;
        setBooks(loadedBooks);
        setFilteredBooks(loadedBooks);
      })
      .catch(function (error) {
        console.error("failed to load books", error);
      });
  }, [token]);

  // search books by title, author or genre
  function handleSearch(event) {
    const input = event.target.value.toLowerCase();
    setSearchText(input);

    const filtered = books.filter(function (book) {
      const titleMatch = book.title?.toLowerCase().includes(input);
      const authorMatch = book.Authors?.map((a) => a.name).join(", ").toLowerCase().includes(input);
      const genreMatch = book.Categories?.map((c) => c.name).join(", ").toLowerCase().includes(input);

      return titleMatch || authorMatch || genreMatch;
    });

    setFilteredBooks(filtered);
  }

  // delete a book (admin only)
  function handleDelete(bookId) {
    const confirmDelete = window.confirm("Delete this book?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:3001/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function () {
        // reload books after delete
        return axios.get("http://localhost:3001/api/books", {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then(function (response) {
        const updatedBooks = response.data.books;
        setBooks(updatedBooks);
        setFilteredBooks(updatedBooks);
      })
      .catch(function (error) {
        console.error("failed to delete book", error);
      });
  }

  // logout user
  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="container py-4">
      {/* header */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <h2 className="flex-grow-1 text-center m-0">
          ~ F I N D | Y O U R | N E W | F A V O U R I T E | B O O K ~
        </h2>

        <div className="d-flex gap-2">
          {role?.toLowerCase() === "admin" && (
            <button
              className="btn btn-primary"
              style={{ border: "none" }}
              onClick={() => navigate("/books/new")}
            >
              Add New Book
            </button>
          )}
          <button className="btn logout-btn" onClick={handleLogout}>
            LogOut
          </button>
        </div>
      </div>

      {/* link to logs (admins only) */}
      {role?.toLowerCase() === "admin" && (
        <div className="mb-3 d-flex justify-content-end">
          <Link to="/logs" className="btn activity-log-btn btn-sm">
            Activity Logs
          </Link>
        </div>
      )}

      {/* search input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search by title, author or genre..."
          className="form-control shadow-sm search-bar"
        />
      </div>

      {/* book cards */}
      {filteredBooks.length === 0 ? (
        <p className="text-muted text-center">No books found.</p>
      ) : (
        <div className="row g-3">
          {filteredBooks.map(function (book) {
            return (
              <div key={book.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm">
                  {book.imageUrl && (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="book-cover"
                    />
                  )}

                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title text-center">
                        <Link to={`/books/${book.id}`} className="book-title-link">
                          {book.title}
                        </Link>
                      </h5>
                    </div>

                    {role?.toLowerCase() === "admin" && (
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => navigate(`/books/${book.id}/edit`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(book.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MainPage;
