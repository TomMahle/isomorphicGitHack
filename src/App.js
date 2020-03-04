import React from "react";
import logo from "./logo.svg";
import "./App.css";
import git from "isomorphic-git";
import http from "isomorphic-git/http/web";
import FS from "@isomorphic-git/lightning-fs";

function App() {
  const fs = new FS("fs");
  const pfs = fs.promises;
  const dir = "/";
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
    .catch(x => console.log(x));
  const newFileName = "bonusReadme.md";
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          onClick={async () => {
            await pfs.writeFile(
              `${dir}/${newFileName}`,
              "very short readme",
              "utf8"
            );
            await git.add({ fs, dir, filepath: newFileName });
            const status = await git.status({ fs, dir, filepath: newFileName });
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
              ref: "master",
              onAuth: () => ({
                username: "TomMahle",
                password: "*censored*"
              }),
              force: true
            });
            console.log(pushResult);
          }}
        >
          Hack the planet
        </button>
      </header>
    </div>
  );
}

export default App;
