import React from 'react';
import './App.css';
import GeneralSettings from './context/GeneralSettings';
import TasksList from './context/TasksContext';
import Home from './pages/Home';

function App() {
  return (
    <GeneralSettings>
      <TasksList>
        <div className='App'>
          <Home />
        </div>
      </TasksList>
    </GeneralSettings>
  );
}

export default App;
