import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./pagesCSS/EditBook.css";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // form fields
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [authors, setAuthors] = useState("");
  const [genres, setGenres] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // load book info when page opens
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const book = response.data;
        setTitle(book.title);
        setYear(book.publicationYear);
        setAuthors(book.Authors?.map((a) => a.name).join(", ") || "");
        setGenres(book.Categories?.map((c) => c.name).join(", ") || "");
        setImageUrl(book.imageUrl || "");
      })
      .catch((error) => {
        console.error("failed to load book", error);
        setErrorMessage("Failed to load book details.");
      });
  }, [id, token]);

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedBook = {
      title,
      publicationYear: year,
      authorNames: authors.split(",").map((name) => name.trim()),
      categoryNames: genres.split(",").map((name) => name.trim()),
      imageUrl,
    };

    axios
      .put(`http://localhost:3001/api/books/${id}`, updatedBook, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate("/books");
      })
      .catch((error) => {
        console.error("failed to update book", error);
        setErrorMessage("Failed to save changes.");
      });
  };

  // show access warning for non-admins
  if (role?.toLowerCase() !== "admin") {
    return (
      <p className="text-center mt-5 text-danger">
        Access restricted to administrators only
      </p>
    );
  }

  return (
    <div className="container mt-2 new-book-page">
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <button className="btn btn-link mb-2" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2 className="text-center mb-4">Edit Book</h2>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Publication Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Author(s)</label>
            <input
              type="text"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Genre(s)</label>
            <input
              type="text"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="form-control"
              placeholder="https://example.com/imagename.jpg"
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn update-btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
