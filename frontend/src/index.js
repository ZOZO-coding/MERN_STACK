import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NotesContextProvider } from './context/NotesContext';
import { CommentsContextProvider } from './context/CommentsContext';
import { TodosContextProvider } from './context/TodosContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotesContextProvider>
      <CommentsContextProvider>
        <TodosContextProvider>
          <App /> 
        </TodosContextProvider>
      </CommentsContextProvider>
    </NotesContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
