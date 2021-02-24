import React, { useEffect } from "react";
import "./App.css";
import git from "isomorphic-git";
import http from "isomorphic-git/http/web";
import FS from "@isomorphic-git/lightning-fs";
import oldBlogs from "./blogs.json";

const fs = new FS("fs", { wipe: true });
const pfs = fs.promises;
const dir = "/";
const fileName = "src/blogs.json";

const SubmitButton = ({ blog, password }) => {
  useEffect(() => {
    git
      .clone({
        fs,
        http,
        dir,
        corsProxy: "https://cors.isomorphic-git.org",
        url: "https://github.com/TomMahle/isomorphicGitHack",
        singleBranch: true,
        depth: 1,
      })
      .then(() => console.log("cloned successfully"));
  }, []);

  return (
    <div className="Admin">
      <button
        onClick={async () => {
          await pfs.writeFile(
            `${dir}${fileName}`,
            JSON.stringify([blog, ...oldBlogs], null, 4),
            "utf8"
          );
          await git.add({ fs, dir, filepath: fileName });
          const status = await git.status({
            fs,
            dir,
            filepath: fileName,
          });
          console.log("file status: ", status);
          await git.commit({
            fs,
            dir,
            message: "this just should not work.",
            author: {
              name: "Mr. Test",
              email: "mrtest@example.com",
            },
          });
          await git.push({
            fs,
            http,
            dir,
            remote: "origin",
            onAuth: () => ({
              username: "TomMahle",
              password: password,
            }),
            force: true,
          });
          console.log("pushed successfully");
        }}
      >
        Hack the planet
      </button>
    </div>
  );
};

export default SubmitButton;
