import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from './Pages/Security/Login';
import Actualite from './Pages/Actualite/Actualite';
import NavComponent from "./Components/NavComponent";

function App() {
  return (
    <Router>
      <div>
        <NavComponent/>

        <Switch>
          <Route path={"/login"} component={Login} />
          <Route path={"/actualite"} component={Actualite} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
