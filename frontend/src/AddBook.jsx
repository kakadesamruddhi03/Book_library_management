import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function AddBook() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] =
    useState("Available");


  async function handleSubmit(e) {

    e.preventDefault();


    if (
      title.trim() === "" ||
      author.trim() === "" ||
      category === ""
    ) {

      alert("Please fill all fields");
      return;

    }


    const newBook = {

      title: title.trim(),
      author: author.trim(),
      category: category,
      availability: availability

    };


    try {

      const response = await fetch(
        "http://localhost:5000/api/books",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(newBook)

        }
      );


      const data = await response.json();


      if (response.ok) {

        alert("Book added successfully!");

        setTitle("");
        setAuthor("");
        setCategory("");
        setAvailability("Available");

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


  return (

    <div className="add-book-page">

      <div className="add-book-card">

        <div className="add-book-header">

          <h1>Add New Book</h1>

          <p>
            Add a new book to the library
          </p>

        </div>


        <form onSubmit={handleSubmit}>


          <div className="form-group">

            <label>
              Book Title
            </label>

            <input
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label>
              Author
            </label>

            <input
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(e) =>
                setAuthor(e.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label>
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
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


          <div className="form-group">

            <label>
              Availability Status
            </label>

            <select
              value={availability}
              onChange={(e) =>
                setAvailability(e.target.value)
              }
            >

              <option value="Available">
                Available
              </option>

              <option value="Issued">
                Issued
              </option>

            </select>

          </div>


          <div className="add-book-buttons">

            <button
              type="button"
              className="cancel-book-btn"
              onClick={() =>
                navigate("/admin")
              }
            >
              Cancel
            </button>


            <button
              type="submit"
              className="save-book-btn"
            >
              Add Book
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default AddBook;