import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NoteShow from './components/NoteShow';
import Comments from './pages/Comments';
import NoteEditForm from './components/NoteEditForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path='/api/notes'
              element={<Home />}
            />
            <Route 
              path='/api/notes/:id'
              element={<NoteShow />}
            />
            <Route 
              path='/api/notes/:id/edit'
              element={<NoteEditForm />}
            />
            <Route 
              path='/api/comments'
              element={<Comments />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
