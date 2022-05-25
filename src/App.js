import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import DeleteNow from './Components/DeleteNow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/x' element={<DeleteNow/>} />
        <Route exact path='/' element={<LoginPage/>} />
        <Route exact path='/home' element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
