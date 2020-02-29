import React from "react";
import logo from "./logo.svg";
import "./App.css";
import git from "isomorphic-git";
import http from "isomorphic-git/http/web";
import FS from "@isomorphic-git/lightning-fs";

function App() {
  console.log(git, FS);
  const fs = new FS("fs");
  git
    .clone({
      fs,
      http,
      dir: "/tutorial",
      corsProxy: "https://cors.isomorphic-git.org",
      url: "https://github.com/isomorphic-git/isomorphic-git",
      singleBranch: true,
      depth: 1
    })
    .then(x => console.log("success"))
    .catch(x => console.log(x));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
