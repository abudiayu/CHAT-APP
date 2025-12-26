import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import "./question.css";

function Question() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description) {
      setError("Title and description are required");
      return;
    }

    try {
      await axios.post(
        "/questions",
        { title, description, tag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/"); // go back to home after asking
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="ask-page">
      <form className="ask-card" onSubmit={handleSubmit}>
        <h2>Ask a Question</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Describe your question..."
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tag (optional)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <div className="ask-actions">
          <button type="submit">Post Question</button>
          <button
            type="button"
            className="cancel"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Question;
