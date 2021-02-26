import React from "react";
import "./App.css";
import blogs from "./blogs.json";
import MaybeAdmin from "./MaybeAdmin";

const App = () => {
  return (
    <div className="App">
      <p />
      <MaybeAdmin />
      <div className="App-header">
        {blogs.map(({ title, body }, index) => (
          <div key={index} className="Blog-post">
            <h1>{title}</h1>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
