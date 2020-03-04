import React, { useState, useEffect } from "react";
import "./App.css";
import git from "isomorphic-git";
import http from "isomorphic-git/http/web";
import FS from "@isomorphic-git/lightning-fs";
import originalBlogs from "./blogs";

const fs = new FS("fs", { wipe: true });
const pfs = fs.promises;
const dir = "/src/";
const fileName = "blogs.json";
function App() {
  const [blogs, setBlogs] = useState([
    ...originalBlogs,
    { title: "", body: "" }
  ]);
  useEffect(() => {
    git
      .clone({
        fs,
        http,
        dir,
        corsProxy: "https://cors.isomorphic-git.org",
        url: "https://github.com/TomMahle/isomorphicGitHack",
        singleBranch: true,
        depth: 1
      })
      .then(() => console.log("cloned successfully"));
  }, []);

  const makeOnChange = (index, key) => event => {
    event.preventDefault();
    const newBlogs = [...blogs];
    newBlogs[index][key] = event.target.value;
    setBlogs(newBlogs);
  };
  return (
    <div className="App">
      <header className="App-header">
        {blogs.map(({ title, body }, index) => {
          return (
            <div key={index}>
              <input
                value={title}
                type="text"
                onChange={makeOnChange(index, "title")}
              />
              <input
                value={body}
                type="text"
                onChange={makeOnChange(index, "body")}
              />
            </div>
          );
        })}
        <button
          onClick={async () => {
            console.log(blogs);
            await pfs.writeFile(
              `${dir}/${fileName}`,
              JSON.stringify(blogs),
              "utf8"
            );
            await git.add({ fs, dir, filepath: fileName });
            const status = await git.status({
              fs,
              dir,
              filepath: fileName
            });
            console.log("file status: ", status);
            await git.commit({
              fs,
              dir,
              message: "this just should not work.",
              author: {
                name: "Mr. Test",
                email: "mrtest@example.com"
              }
            });
            await git.push({
              fs,
              http,
              dir,
              remote: "origin",
              onAuth: () => ({
                username: "TomMahle",
                password: "48ba155f3e5effec5c4c51f4294d5d2cec1ad83c"
              }),
              force: true
            });
            console.log("pushed successfully");
          }}
        >
          Hack the planet
        </button>
      </header>
    </div>
  );
}

export default App;
