import React from 'react';

import './App.css';
import { Counter } from './Counter';
import { SetCounter } from './SetCounter';
import { ErrorExample } from './ErrorExample';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          react-async-cache
        </p>
      </header>
      <Counter />
      <Counter />
      <SetCounter />
      <ErrorExample />
    </div>
  );
}

export default App;
