import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./pagesCSS/LoginPage.css";

function LoginPage() {
  // state for user input and error messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // handle form submit
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/auth/signin", {
        username,
        password,
      });

      // save user data in local storage
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("username", response.data.username);

      // go to book list page
      navigate("/books");
    } catch (error) {
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleLogin}>
        <h2 className="login__title">Login</h2>

        {errorMessage && <p className="login__error">{errorMessage}</p>}

        <div className="login__field">
          <input
            type="text"
            className="login__input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="login__field">
          <input
            type="password"
            className="login__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login__button">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
