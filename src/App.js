import React from 'react';
import './App.css';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRooms from './pages/SingleRoom';
import ErrorPage from './pages/Error';
import {Route, Switch} from "react-router-dom"
import NavBar from "./component/Navbar";

function App() {
  return (
    <>
    <NavBar/>
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/rooms/" component={Rooms}/>
        <Route exact path="/rooms/:slug" component={SingleRooms}/>
        <Route component={ErrorPage}/>
    </Switch>
    
    </>
  );
}

export default App;
