import React, { useState } from "react";
import "./App.css";
import SubmitButton from "./SubmitButton";

const MaybeAdmin = () => {
  const [form, setForm] = useState({
    title: "",
    body: "",
    username: "TomMahle",
    password: "",
  });
  if (!window.location.href.includes("admin")) {
    return null;
  }

  const makeOnChange = (key) => (event) => {
    event.preventDefault();
    const updatedForm = { ...form };
    updatedForm[key] = event.target.value;
    setForm(updatedForm);
  };

  return (
    <div className="Admin">
      <span>
        <label>Title: </label>
        <input
          value={form.title}
          type="text"
          onChange={makeOnChange("title")}
        />
      </span>
      <span>
        <label>Body: </label>
        <input value={form.body} type="text" onChange={makeOnChange("body")} />
      </span>
      <span>
        <label>Github Username: </label>
        <input
          value={form.username}
          type="username"
          onChange={makeOnChange("username")}
        />
      </span>
      <span>
        <label>Github Password: </label>
        <input
          value={form.password}
          type="password"
          onChange={makeOnChange("password")}
        />
      </span>
      <SubmitButton form={form} />
    </div>
  );
};

export default MaybeAdmin;
