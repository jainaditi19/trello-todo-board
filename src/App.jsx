import React from 'react';
import Board from './components/Board';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Trello-style Todo Board</h1>
      <Board />
    </div>
  );
}

export default App;