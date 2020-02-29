import React from 'react';
import logo from './logo.svg';
import './App.css';
import git from 'isomorphic-git';
import FS from '@isomorphic-git/lightning-fs';

function App() {
    const dir = '/tutorial';
    console.log(git, FS);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link"
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
