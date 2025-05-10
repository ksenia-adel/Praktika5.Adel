import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import BookDetails from "./pages/BookDetails";
import AddNewBook from "./pages/AddNewBook";
import EditBook from "./pages/EditBook";
import ActivityLogs from "./pages/ActivityLogs";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/books" element={<MainPage />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/books/new" element={<AddNewBook />} />
          <Route path="/books/:id/edit" element={<EditBook />} />
          <Route path="/logs" element={<ActivityLogs />} />
        </Routes>
      </Router>

      {/* footer */}
      <footer style={{ textAlign: "center", color: "#999" }}>
        © {new Date().getFullYear()} Ksenia Adel 231789EDTR
      </footer>
    </div>
  );
}

export default App;
