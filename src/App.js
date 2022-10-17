import React, {useState, useEffect} from 'react';
import {ContextProvider} from './Util/UserContext';
import logo from './logo.svg';
import './App.css';
import './pages/MainPage'
import MainPage from './pages/MainPage';
import { io } from 'socket.io-client';
import Register from './pages/Register';
import ProfileScreen from './pages/ProfileScreen';
import StreamScreen from './pages/SreamScreen';
import ViewStreamScreen from './pages/ViewStreamScreen';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './pages/SignIn';
import Constants from './Constants';


function App() {

    // const session  = io.connect(Constants.SERVER_URL, {jsonp: false});;

    const [user, setUser] = useState(null)
    // const [sessionID, setSessionID] = useState('')
    /*
    useEffect(() => {

      session.on(Constants.SUCCESSFUL_CONNECTION, (ID) => {
          setSessionID(ID);
          console.log('sokcet id: ', ID);
      })



      return () => {
        session.disconnect();
      }
    }, [])
     */
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
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
