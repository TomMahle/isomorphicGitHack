import React from "react";
import "./App.css";

/** Shown on every page: what this site is. */
export const DemoBanner = () => (
  <div className="Disclaimer Disclaimer-banner" role="note">
    <strong>Experimental demo.</strong> This blog accompanies the talk “Git as
    a Data Store”. It is deliberately a hack, not a pattern to copy as-is.
  </div>
);

/** Shown above the admin form: the risks of using it. */
export const AdminWarning = () => (
  <div className="Disclaimer Disclaimer-warning" role="alert">
    <h2>
      <span aria-hidden="true">⚠️</span> Warning: read this before entering
      anything
    </h2>
    <ul>
      <li>
        <strong>Your credentials pass through a stranger’s server.</strong>{" "}
        Browsers can’t talk to GitHub’s git server directly, so every request,
        including the username and password or token you enter below, goes
        through the public CORS proxy at <code>cors.isomorphic-git.org</code>,
        which can read it.
      </li>
      <li>
        <strong>Never enter your real GitHub password or a broad token.</strong>{" "}
        If you try this, use a fine-grained token that can only write to your
        own fork of this repo, and revoke it straight afterwards.
      </li>
      <li>
        <strong>Posting force-pushes.</strong> If anyone else posted since this
        page loaded, their post is overwritten.
      </li>
    </ul>
  </div>
);
