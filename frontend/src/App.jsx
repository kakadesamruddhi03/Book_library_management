import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";

import { useEffect, useState } from "react";

import Login from "./Login";
import Signup from "./Signup";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AddBook from "./AddBook";
import EditBook from "./EditBook";

import "./App.css";


/* =========================================
   ENTRY PAGE
========================================= */

function EntryPage() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  if (isLoggedIn) {
    return <Navigate to="/user" replace />;
  }

  return <Navigate to="/login" replace />;
}


/* =========================================
   USER PANEL
========================================= */

function UserPanel() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);


  /* =====================================
     GET LOGGED-IN USER
  ===================================== */

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") || "null"
  );

  const userName = loggedInUser?.name || "User";


  /* =====================================
     LOAD BOOKS
  ===================================== */

  async function loadBooks() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/books"
      );

      const data = await response.json();

      if (response.ok) {
        setBooks(data);
      }
    } catch (error) {
      console.log("Error loading books:", error);
    }
  }


  /* =====================================
     LOAD + AUTO REFRESH
  ===================================== */

  useEffect(() => {
    loadBooks();

    const interval = setInterval(() => {
      loadBooks();
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  /* =====================================
     LOGOUT
  ===================================== */

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");

    navigate("/login");
  }


  /* =====================================
     SEARCH
  ===================================== */

  const filteredBooks = books.filter((book) => {
    const searchText = search.toLowerCase();

    return (
      book.title?.toLowerCase().includes(searchText) ||
      book.author?.toLowerCase().includes(searchText)
    );
  });


  return (
    <div className="user-panel">

      {/* =================================
          HEADER
      ================================= */}

      <header className="user-header">

        <div className="user-brand">

          <p>WELCOME TO</p>

          <h1>📚 Librixa</h1>

          {/* USER NAME */}

          <span>
            Hello, {userName} 👋
          </span>

          <small>
            Your Digital Library Space
          </small>

        </div>


        <button
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>


      {/* =================================
          MAIN CONTENT
      ================================= */}

      <main className="user-content">


        {/* SEARCH */}

        <div className="search-area">

          <input
            type="text"
            placeholder="🔎 Search book by title or author..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        {/* =================================
            LIBRARY THOUGHT
        ================================= */}

        <div className="library-thought">

          <div className="thought-icon">
            📖
          </div>

          <div className="thought-content">

            <h3>
              A Library is More Than Books
            </h3>

            <p>
              Every book holds a different journey,
              a new idea, and a chance to see the
              world from a different perspective.
              Explore, discover, and let every page
              add something meaningful to your journey.
            </p>

            <span>
              “A good book can change the way you see the world.”
            </span>

          </div>

        </div>


        {/* =================================
            BOOK COUNT
        ================================= */}

        <div className="book-count-section">

          <span>
            {filteredBooks.length} Books Available
          </span>

        </div>


        {/* =================================
            BOOK LIST
        ================================= */}

        {filteredBooks.length === 0 ? (

          <div className="empty-books">

            <div className="book-icon">
              📚
            </div>

            <h3>
              No Books Found
            </h3>

            <p>
              Try searching with another book
              title or author name.
            </p>

          </div>

        ) : (

          <div className="user-book-list">

            {filteredBooks.map((book) => (

              <div
                className="user-book-card"
                key={book._id}
              >

                <div className="user-book-info">

                  <h3>
                    {book.title}
                  </h3>

                  <p>
                    <strong>Author:</strong>{" "}
                    {book.author}
                  </p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {book.category}
                  </p>

                </div>


                <div className="user-book-actions">

                  <span
                    className={
                      book.availability === "Available"
                        ? "user-available"
                        : "user-issued"
                    }
                  >

                    {book.availability === "Available"
                      ? "● Available"
                      : "● Unavailable"}

                  </span>


                  <button
                    type="button"
                    className="view-book-btn"
                    onClick={() =>
                      setSelectedBook(book)
                    }
                  >
                    View Details
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>


      {/* =================================
          BOOK DETAILS MODAL
      ================================= */}

      {selectedBook && (

        <div
          className="book-modal-overlay"
          onClick={() => setSelectedBook(null)}
        >

          <div
            className="book-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="book-modal-close"
              onClick={() =>
                setSelectedBook(null)
              }
            >
              ×
            </button>


            <div className="modal-book-icon">
              📖
            </div>


            <h2>
              {selectedBook.title}
            </h2>


            <div className="book-detail-row">

              <strong>
                Author
              </strong>

              <span>
                {selectedBook.author}
              </span>

            </div>


            <div className="book-detail-row">

              <strong>
                Category
              </strong>

              <span>
                {selectedBook.category}
              </span>

            </div>


            <div className="book-detail-row">

              <strong>
                Status
              </strong>

              <span
                className={
                  selectedBook.availability === "Available"
                    ? "modal-available"
                    : "modal-unavailable"
                }
              >
                {selectedBook.availability === "Available"
                  ? "Available"
                  : "Unavailable"}
              </span>

            </div>


            {selectedBook.description && (

              <div className="book-description">

                <strong>
                  Description
                </strong>

                <p>
                  {selectedBook.description}
                </p>

              </div>

            )}


            {selectedBook.pdfUrl ? (

              <a
                href={selectedBook.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="download-book-btn"
              >
                📥 Download Book
              </a>

            ) : (

              <button
                type="button"
                className="download-disabled-btn"
                disabled
              >
                PDF Not Available
              </button>

            )}

          </div>

        </div>

      )}


      {/* =================================
          FOOTER
      ================================= */}

      <footer className="library-footer">

        <div className="footer-content">

          <div className="footer-brand">

            <h2>
              📚 Librixa
            </h2>

            <p>
              Your Digital Library Space
            </p>

          </div>


          <div className="footer-links">

            <span>
              Explore
            </span>

            <span>
              Read
            </span>

            <span>
              Discover
            </span>

          </div>


          <div className="footer-bottom">

            © 2026 Librixa. All rights reserved.

          </div>

        </div>

      </footer>

    </div>
  );
}


/* =========================================
   APP
========================================= */

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<EntryPage />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/user"
          element={<UserPanel />}
        />

        <Route
          path="/adminlogin"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/addbook"
          element={<AddBook />}
        />

        <Route
          path="/editbook"
          element={<EditBook />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;