import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./pagesCSS/AddNewBook.css";

function AddNewBook() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [authors, setAuthors] = useState("");
  const [genres, setGenres] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // block access for non-admins
  if (role?.toLowerCase() !== "admin") {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          Access restricted to administrators only
        </div>
      </div>
    );
  }

  // handle form submit
  function handleSubmit(event) {
    event.preventDefault();

    if (!title || !year) {
      setErrorMessage("Title and year are required.");
      return;
    }

    const newBook = {
      title: title,
      publicationYear: year,
      authorNames: authors.split(",").map((name) => name.trim()),
      categoryNames: genres.split(",").map((name) => name.trim()),
      imageUrl: imageUrl,
    };

    axios
      .post("http://localhost:3001/api/books", newBook, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function () {
        navigate("/books");
      })
      .catch(function (error) {
        console.error("failed to add book", error);
        setErrorMessage("Could not add the book.");
      });
  }

  return (
    <div className="container mt-2 new-book-page">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px", width: "100%" }}>
        <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2 className="mb-4 text-center">New Book</h2>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Publication Year</label>
            <input
              type="number"
              className="form-control"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Author(s)</label>
            <input
              type="text"
              className="form-control"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Genre(s)</label>
            <input
              type="text"
              className="form-control"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/imagename.jpg"
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary" style={{ border: "none" }}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewBook;
