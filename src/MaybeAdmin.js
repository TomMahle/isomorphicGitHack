import React, { useState } from "react";
import "./App.css";
import SubmitButton from "./SubmitButton";

const MaybeAdmin = () => {
  const [newBlog, setNewBlog] = useState({ title: "", body: "" });
  const [username, setUsername] = useState("TomMahle");
  const [password, setPassword] = useState("");
  if (!window.location.href.includes("admin")) {
    return null;
  }

  const makeOnChange = (key) => (event) => {
    event.preventDefault();
    const updatedBlog = { ...newBlog };
    updatedBlog[key] = event.target.value;
    setNewBlog(updatedBlog);
  };

  return (
    <div className="Admin">
      <span>
        <label>Title: </label>
        <input
          value={newBlog.title}
          type="text"
          onChange={makeOnChange("title")}
        />
      </span>
      <span>
        <label>Body: </label>
        <input
          value={newBlog.body}
          type="text"
          onChange={makeOnChange("body")}
        />
      </span>
      <span>
        <label>Github Username: </label>
        <input
          value={username}
          type="username"
          onChange={(e) => {
            e.preventDefault();
            setUsername(e.target.value);
          }}
        />
      </span>
      <span>
        <label>Github Password: </label>
        <input
          value={password}
          type="password"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
      </span>
      <SubmitButton blog={newBlog} password={password} username={username} />
    </div>
  );
};

export default MaybeAdmin;
