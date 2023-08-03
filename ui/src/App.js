import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      {/* Other components will go here */}
    </div>
  );
}

export default App;

/* You may also want to add CSS rules for the .main-content class */