import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./pagesCSS/BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  // state for book and comments
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // fetch book info
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("failed to load book", error);
      });
  }, [id, token]);

  // fetch comments for this book
  const fetchComments = useCallback(() => {
    axios
      .get(`http://localhost:3001/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const result = Array.isArray(response.data)
          ? response.data
          : response.data.comments;
        setComments(Array.isArray(result) ? result : []);
      })
      .catch((error) => {
        console.error("failed to load comments", error);
      });
  }, [id, token]);

  // load comments on mount
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // submit a new comment
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    axios
      .post(
        `http://localhost:3001/api/comments/${id}`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setNewComment("");
        fetchComments();
      })
      .catch((error) => {
        console.error("failed to submit comment", error);
      });
  };

  // delete a comment
  const handleDeleteComment = (commentId) => {
    const confirmDelete = window.confirm("Delete this comment?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:3001/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      })
      .catch((error) => {
        console.error("failed to delete comment", error);
      });
  };

  // show loading text while book is being fetched
  if (!book) {
    return <p className="text-center mt-5">Loading book...</p>;
  }

  return (
    <div className="book-detail-wrapper my-5 px-3">
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-10">

          {/* book details */}
          <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px", width: "100%" }}>
            <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
              ← Back
            </button>
            <h2 className="text-primary mb-3">{book.title}</h2>
            <p><strong>Author(s):</strong> {book.Authors?.map((a) => a.name).join(", ")}</p>
            <p><strong>Genre(s):</strong> {book.Categories?.map((c) => c.name).join(", ")}</p>
            <p><strong>Year of Publication:</strong> {book.publicationYear}</p>
          </div>

          {/* comments section */}
          <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px", width: "100%" }}>
            <h4 className="mb-3">Comments</h4>

            {comments.length === 0 ? (
              <p className="text-muted">No comments yet.</p>
            ) : (
              <ul className="list-group mb-3">
                {comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      <strong>{comment.User?.username || "User"}</strong>: {comment.content}
                    </span>
                    {(comment.User?.username === username || role?.toLowerCase() === "admin") && (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* add new comment */}
            <form onSubmit={handleCommentSubmit}>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows={3}
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Add Comment
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BookDetails;
