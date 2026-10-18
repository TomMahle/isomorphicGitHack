import React from "react";
import "./App.css";
import blogs from "./blogs.json";
import MaybeAdmin from "./MaybeAdmin";
import { DemoBanner } from "./Disclaimer";

const App = () => {
  return (
    <div className="App">
      <DemoBanner />
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
