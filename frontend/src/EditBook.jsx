import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function EditBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] =
    useState("Available");

  useEffect(() => {
    const savedBook = JSON.parse(
      localStorage.getItem("editBook")
    );

    if (!savedBook) {
      return;
    }

    setBook(savedBook);
    setTitle(savedBook.title || "");
    setAuthor(savedBook.author || "");
    setCategory(savedBook.category || "");
    setAvailability(
      savedBook.availability || "Available"
    );
  }, []);

  async function handleUpdate(e) {
    e.preventDefault();

    if (
      title.trim() === "" ||
      author.trim() === "" ||
      category === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!book?._id) {
      alert("Book ID not found");
      return;
    }

    const updatedBook = {
      title: title.trim(),
      author: author.trim(),
      category: category,
      availability: availability
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${book._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedBook)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Book updated successfully!");

        localStorage.removeItem("editBook");

        navigate("/admin");
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

  /* BOOK NOT FOUND */

  if (!book) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f4f7fb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            background: "white",
            padding: "40px",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >
          <div style={{ fontSize: "50px" }}>
            📚
          </div>

          <h2
            style={{
              marginTop: "15px",
              color: "#1f2937"
            }}
          >
            Book Not Found
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginBottom: "25px"
            }}
          >
            No book selected for editing.
          </p>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            style={{
              border: "none",
              background: "#20639b",
              color: "white",
              padding: "12px 25px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "70px 20px",
        fontFamily: "Arial, sans-serif"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto 25px auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px"
        }}
      >

        <div>
          <p
            style={{
              margin: 0,
              color: "#20639b",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "1px"
            }}
          >
            LIBRIXA
          </p>

          <h1
            style={{
              margin: "5px 0",
              color: "#1f2937",
              fontSize: "30px"
            }}
          >
            Edit Book
          </h1>

          <p
            style={{
              margin: 0,
              color: "#6b7280"
            }}
          >
            Update the selected book details
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin")}
          style={{
            border: "1px solid #d1d5db",
            background: "white",
            color: "#374151",
            padding: "11px 18px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          ← Back to Dashboard
        </button>

      </div>


      {/* EDIT CARD */}

      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          background: "white",
          borderRadius: "18px",
          padding: "35px",
          boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb"
        }}
      >

        {/* CARD TITLE */}

        <div
          style={{
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "20px",
            marginBottom: "25px"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >

            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#e8f0fe",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px"
              }}
            >
              ✏️
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#1f2937",
                  fontSize: "21px"
                }}
              >
                Book Information
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#6b7280",
                  fontSize: "14px"
                }}
              >
                Make changes to your book
              </p>
            </div>

          </div>
        </div>


        {/* FORM */}

        <form onSubmit={handleUpdate}>

          {/* TITLE */}

          <div style={{ marginBottom: "22px" }}>

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "600",
                fontSize: "14px"
              }}
            >
              Book Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Enter book title"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px 15px",
                border: "1px solid #d1d5db",
                borderRadius: "9px",
                fontSize: "15px",
                outline: "none",
                background: "#fff"
              }}
            />

          </div>


          {/* AUTHOR */}

          <div style={{ marginBottom: "22px" }}>

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "600",
                fontSize: "14px"
              }}
            >
              Author
            </label>

            <input
              type="text"
              value={author}
              onChange={(e) =>
                setAuthor(e.target.value)
              }
              placeholder="Enter author name"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px 15px",
                border: "1px solid #d1d5db",
                borderRadius: "9px",
                fontSize: "15px",
                outline: "none",
                background: "#fff"
              }}
            />

          </div>


          {/* CATEGORY + STATUS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "25px"
            }}
          >

            {/* CATEGORY */}

            <div>

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#374151",
                  fontWeight: "600",
                  fontSize: "14px"
                }}
              >
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "13px 15px",
                  border: "1px solid #d1d5db",
                  borderRadius: "9px",
                  fontSize: "15px",
                  outline: "none",
                  background: "white",
                  cursor: "pointer"
                }}
              >

                <option value="">
                  Select category
                </option>

                <option value="Programming">
                  Programming
                </option>

                <option value="Technology">
                  Technology
                </option>

                <option value="Novel">
                  Novel
                </option>

                <option value="Science">
                  Science
                </option>

                <option value="History">
                  History
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            {/* AVAILABILITY */}

            <div>

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#374151",
                  fontWeight: "600",
                  fontSize: "14px"
                }}
              >
                Availability Status
              </label>

              <select
                value={availability}
                onChange={(e) =>
                  setAvailability(e.target.value)
                }
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "13px 15px",
                  border: "1px solid #d1d5db",
                  borderRadius: "9px",
                  fontSize: "15px",
                  outline: "none",
                  background: "white",
                  cursor: "pointer"
                }}
              >

                <option value="Available">
                  Available
                </option>

                <option value="Issued">
                  Issued
                </option>

              </select>

            </div>

          </div>


          {/* CURRENT STATUS */}

          <div
            style={{
              background:
                availability === "Available"
                  ? "#ecfdf3"
                  : "#fff1f2",
              border:
                availability === "Available"
                  ? "1px solid #bbf7d0"
                  : "1px solid #fecdd3",
              borderRadius: "10px",
              padding: "14px 16px",
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >

            <span style={{ fontSize: "20px" }}>
              {availability === "Available"
                ? "✅"
                : "📕"}
            </span>

            <div>

              <strong
                style={{
                  color:
                    availability === "Available"
                      ? "#15803d"
                      : "#be123c"
                }}
              >
                Current Status:{" "}
                {availability === "Available"
                  ? "Available"
                  : "Unavailable"}
              </strong>

              <p
                style={{
                  margin: "3px 0 0",
                  color: "#6b7280",
                  fontSize: "13px"
                }}
              >
                This status will be visible to users.
              </p>

            </div>

          </div>


          {/* BUTTONS */}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              flexWrap: "wrap"
            }}
          >

            <button
              type="button"
              onClick={() => navigate("/admin")}
              style={{
                border: "1px solid #d1d5db",
                background: "#fff",
                color: "#374151",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                border: "none",
                background: "#20639b",
                color: "white",
                padding: "12px 25px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              ✓ Update Book
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditBook;