import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NoteShow from './components/NoteShow';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path='/'
              element={<Home />}
            />
            <Route 
              path='/:id'
              element={<NoteShow />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
