import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import GeneralSettings from './context/GeneralSettings';
import TasksList from './context/TasksContext';
import Home from './pages/Layout';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <GeneralSettings>
      <TasksList>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </TasksList>
    </GeneralSettings>
  );
}

export default App;
