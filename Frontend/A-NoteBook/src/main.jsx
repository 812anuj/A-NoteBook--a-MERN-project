
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from "react-router-dom";
import NoteContext from './context/NoteContext';
import NoteState from './context/NoteState';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NoteState>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </NoteState>
);

