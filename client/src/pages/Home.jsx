import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "./home.css";

function Home() {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/questions/all-question", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setQuestions(res.data.questions))
      .catch(console.error);
  }, [token]);

  return (
    <div className="chat-layout">
      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="chat-sidebar">
        {/* HEADER */}
        <div className="chat-header">
          <div className="app-logo">
            <img src="https://i.pinimg.com/736x/4d/eb/6a/4deb6a150b268f361add11a044ea2a4f.jpg" alt="" />
          </div>
          <div className="user-name">HI,👋: {user?.username}</div>
        </div>

        {/* SECTION TITLE */}
        <div className="sidebar-title">
          <span>Questions</span>
          <button onClick={() => navigate("/ask")}>Ask Question</button>
        </div>
        {/* QUESTION THREADS */}
        <div className="chat-thread-list">
          {questions.map((q) => (
            <div
              key={q.questionid}
              className="chat-thread"
              onClick={() => navigate(`/question/${q.questionid}`)}
            >
              <strong className="thread-title">{q.title}</strong>
              <small className="thread-user">by {q.username}</small>
            </div>
          ))}
        </div>
      </aside>

      {/* ===== RIGHT MAIN AREA ===== */}
      <main className="chat-main empty">
        <h2>Welcome, {user?.username} 👋</h2>
        <p>Select a question to start chatting</p>
      </main>
    </div>
  );
}

export default Home;
