import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

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
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to='api/user/login'/>}/>

            {/* routes for notes */}
            <Route path='/api/notes'>
              <Route index element={user ? <Home /> : <Navigate to='/api/user/login'/>}/>
              <Route path=':id' element={<NoteShow />}/>
              <Route path=':id/edit' element={<NoteEditForm />}/>
            </Route>
            
            {/* routes for comments */}
            <Route path='/api/comments' element={user ? <Comments /> : <Navigate to='/api/user/login'/>}/>

            {/* routes for todo list */}
            <Route path='/api/todos' element={user ? <Todos /> : <Navigate to='/api/user/login'/>} />

            {/* routes for user login and signup */}
            <Route path='/api/user/login' element={!user ? <Login /> : <Navigate to='/api/notes'/>}/>
            <Route path='/api/user/signup' element={!user ? <Signup /> : <Navigate to='/api/notes'/>}/>

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
