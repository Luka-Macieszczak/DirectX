import React, {useState} from 'react';
import UserContext from './Util/UserContext';
import logo from './logo.svg';
import './App.css';
import './pages/MainPage'
import MainPage from './pages/MainPage';
import { io } from 'socket.io-client';
import Register from './pages/Register';
import ProfileScreen from './pages/ProfileScreen';
import StreamScreen from './pages/SreamScreen';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './pages/SignIn';
import Constants from './Constants';

function App() {
    const session = io.connect(Constants.SERVER_URL, {jsonp: false})

    const [user, setUser] = useState(null)

    return (
    <UserContext.Provider value={{user: user, setUser: setUser, session: session}}>
      <Router>
        <Routes>
          <Route exact path='/' element={< MainPage />}></Route>
          <Route exact path='/Register' element={< Register />}></Route>
          <Route exact path='/SignIn' element={< SignIn />}></Route>
          <Route exact path='/ProfileScreen' element={ <ProfileScreen/>}></Route>
          <Route exact path='/StreamScreen' element={ <StreamScreen/>}></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
