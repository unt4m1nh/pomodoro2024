import './App.css';
import GeneralSettings from './context/GeneralSettings';
import Home from './pages/Home';

function App() {
  return (
    <GeneralSettings>
      <div className='App'>
        <Home />
      </div>
    </GeneralSettings>
  );
}

export default App;
