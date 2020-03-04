import React, { useState, useEffect } from "react";
import "./App.css";
import git from "isomorphic-git";
import http from "isomorphic-git/http/web";
import FS from "@isomorphic-git/lightning-fs";
import originalBlogs from "./blogs";

const fs = new FS("fs");
const pfs = fs.promises;
const dir = "/";
const newFileName = "bonusReadme.md";
function App() {
  const [blogs, setBlogs] = useState(originalBlogs);
  useEffect(
    () =>
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
        .then(() => console.log("cloned successfully"))
        .catch(x => console.log(x)),
    []
  );

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
            await pfs.writeFile(
              `${dir}/${newFileName}`,
              "very short readme",
              "utf8"
            );
            await git.add({ fs, dir, filepath: newFileName });
            const status = await git.status({
              fs,
              dir,
              filepath: newFileName
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
            const pushResult = await git.push({
              fs,
              http,
              dir,
              remote: "origin",
              ref: "feature/blogs",
              onAuth: () => ({
                username: "TomMahle",
                password: "441643eb35bc900852c3935a764ec2ab478d3fac"
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
