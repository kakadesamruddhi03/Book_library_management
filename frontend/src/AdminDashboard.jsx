import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);


  /* =================================
     LOAD BOOKS FROM MONGODB
  ================================= */

  useEffect(() => {

    loadBooks();

  }, []);


  async function loadBooks() {

    try {

      const response = await fetch(
        "http://localhost:5000/api/books"
      );

      const data = await response.json();

      if (response.ok) {

        setBooks(data);

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert(
        "Server error. Please make sure backend is running."
      );

    } finally {

      setLoading(false);

    }

  }


  /* =================================
     COUNTS
  ================================= */

  const totalBooks = books.length;

  const availableBooks = books.filter(
    (book) =>
      book.availability === "Available"
  ).length;

  const issuedBooks = books.filter(
    (book) =>
      book.availability === "Issued"
  ).length;


  /* =================================
     LOGOUT
  ================================= */

  function logout() {

    localStorage.removeItem("isAdmin");

    navigate("/adminlogin");

  }


  /* =================================
     DELETE BOOK
  ================================= */

  async function deleteBook(id) {

    const confirmDelete =
      window.confirm(
        "Do you want to delete this book?"
      );

    if (!confirmDelete) {
      return;
    }


    try {

      const response = await fetch(
        `http://localhost:5000/api/books/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();


      if (response.ok) {

        alert(
          "Book deleted successfully!"
        );

        loadBooks();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert(
        "Server error. Please make sure backend is running."
      );

    }

  }


  /* =================================
     EDIT BOOK
  ================================= */

  function editBook(book) {

    localStorage.setItem(
      "editBook",
      JSON.stringify(book)
    );

    navigate("/editbook");

  }


  return (

    <div className="admin-panel">

      {/* ================= HEADER ================= */}

      <header className="admin-header">

        <div>

          <p>LIBRIXA</p>

          <h1>Admin Dashboard</h1>

          <span>
            Manage books and library records
          </span>

        </div>


        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center"
          }}
        >

          {/* USER PANEL */}

          <button
            type="button"
            onClick={() =>
              navigate("/user")
            }
            style={{
              border: "none",
              backgroundColor: "#e8f0fe",
              color: "#20639b",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            User Panel
          </button>


          {/* LOGOUT */}

          <button
            type="button"
            onClick={logout}
            style={{
              border: "none",
              backgroundColor: "#f8d7da",
              color: "#842029",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Logout
          </button>

        </div>

      </header>


      {/* ================= CONTENT ================= */}

      <div className="admin-content">

        <div className="admin-welcome">

          <h2>
            Welcome, Admin
          </h2>

          <p>
            Manage the books available in the library
            from this dashboard.
          </p>

        </div>


        {/* ================= CARDS ================= */}

        <div className="admin-cards">

          {/* TOTAL */}

          <div className="admin-card">

            <div className="admin-icon">
              📚
            </div>

            <div>

              <span>
                Total Books
              </span>

              <h2>
                {totalBooks}
              </h2>

            </div>

          </div>


          {/* AVAILABLE */}

          <div className="admin-card">

            <div className="admin-icon">
              ✅
            </div>

            <div>

              <span>
                Available Books
              </span>

              <h2>
                {availableBooks}
              </h2>

            </div>

          </div>


          {/* UNAVAILABLE */}

          <div className="admin-card">

            <div className="admin-icon">
              📖
            </div>

            <div>

              <span>
                Unavailable Books
              </span>

              <h2>
                {issuedBooks}
              </h2>

            </div>

          </div>

        </div>


        {/* ================= MANAGE ================= */}

        <div className="manage-section">

          <div>

            <h2>
              Manage Books
            </h2>

            <p>
              Add, edit, delete and manage library books.
            </p>

          </div>


          <button
            type="button"
            onClick={() =>
              navigate("/addbook")
            }
            style={{
              border: "none",
              backgroundColor: "#20639b",
              color: "white",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            + Add Book
          </button>

        </div>


        {/* ================= BOOK LIST ================= */}

        {loading ? (

          <div className="admin-empty">

            <div className="admin-book-icon">
              📚
            </div>

            <h3>
              Loading Books...
            </h3>

          </div>

        ) : books.length === 0 ? (

          <div className="admin-empty">

            <div className="admin-book-icon">
              📚
            </div>

            <h3>
              No Books Added
            </h3>

            <p>
              Add books to start managing the library.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/addbook")
              }
              style={{
                border: "none",
                backgroundColor: "#20639b",
                color: "white",
                padding: "10px 18px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Add Your First Book
            </button>

          </div>

        ) : (

          <div className="book-list">

            {books.map((book) => (

              <div
                className="book-item"
                key={book._id}
              >

                <div className="book-details">

                  <h3>
                    {book.title}
                  </h3>

                  <p>
                    <strong>
                      Author:
                    </strong>{" "}
                    {book.author}
                  </p>

                  <p>
                    <strong>
                      Category:
                    </strong>{" "}
                    {book.category}
                  </p>

                </div>


                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap"
                  }}
                >

                  {/* STATUS */}

                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px 14px",
                      borderRadius: "20px",
                      backgroundColor:
                        book.availability === "Available"
                          ? "#d1f2df"
                          : "#f8d7da",
                      color:
                        book.availability === "Available"
                          ? "#198754"
                          : "#842029",
                      fontSize: "13px",
                      fontWeight: "600"
                    }}
                  >

                    {book.availability === "Issued"
                      ? "Unavailable"
                      : "Available"}

                  </span>


                  {/* EDIT */}

                  <button
                    type="button"
                    onClick={() =>
                      editBook(book)
                    }
                    style={{
                      border: "none",
                      backgroundColor: "#fff3cd",
                      color: "#856404",
                      padding: "8px 15px",
                      borderRadius: "7px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>


                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      deleteBook(book._id)
                    }
                    style={{
                      border: "none",
                      backgroundColor: "#f8d7da",
                      color: "#842029",
                      padding: "8px 15px",
                      borderRadius: "7px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default AdminDashboard;