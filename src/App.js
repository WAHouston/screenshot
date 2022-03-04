import logo from './logo.svg';
import './App.css';
import ScreenshotButton from './ScreenshotButton';
import { useRef } from 'react';


function App() {
  const ref = useRef(null)
  return (
    <div className="App" ref={ref}>
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
        <ScreenshotButton target={ref} />
      </header>
    </div>
  );
}

export default App;
