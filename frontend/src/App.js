import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NoteShow from './components/NoteShow';
import Comments from './pages/Comments';
import NoteEditForm from './components/NoteEditForm';
import Todos from './pages/Todos';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            {/* routes for notes */}
            <Route path='/api/notes'>
              <Route index element={<Home />}/>
              <Route path=':id' element={<NoteShow />}/>
              <Route path=':id/edit' element={<NoteEditForm />}/>
            </Route>
            
            {/* routes for comments */}
            <Route path='/api/comments' element={<Comments />}/>

            {/* routes for todo list */}
            <Route path='/api/todos' element={<Todos />} />

            {/* routes for user login and signup */}
            <Route path='/api/user/login' element={<Login />}/>
            <Route path='/api/user/signup' element={<Signup />}/>

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
