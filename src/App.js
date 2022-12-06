import React, {useState, useEffect} from 'react';
import {ContextProvider} from './Util/UserContext';
import './App.css';
import './pages/MainPage'
import MainPage from './pages/MainPage';
import Register from './pages/Register';
import ProfileScreen from './pages/ProfileScreen';
import StreamScreen from './pages/SreamScreen';
import AdminPage from "./pages/AdminPage";
import ViewStreamScreen from './pages/ViewStreamScreen';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './pages/SignIn';


function App() {

    return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={< MainPage />}></Route>
          <Route exact path='/Register' element={< Register />}></Route>
          <Route exact path='/SignIn' element={< SignIn />}></Route>
          <Route exact path='/ProfileScreen' element={ <ProfileScreen/>}></Route>
          <Route exact path='/StreamScreen' element={ <StreamScreen/>}></Route>
          <Route exact path='/ViewStreamScreen' element={ <ViewStreamScreen/>}></Route>
          <Route exact path='/AdminPage' element={<AdminPage />}></Route>
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
