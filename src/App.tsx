import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Home from "./components/Home";
import MyGardens from "./components/MyGardens";
import GardenView from "./components/GardenView";
import CreateGarden from "./components/CreateGarden";
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/myGardens">My Current Gardens</Link>
            </li>
            <li>
              <Link to="/gardenView">GardenView</Link>
            </li>
            <li>
              <Link to="/createGarden">Create Garden</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/myGardens">
            <MyGardens />
          </Route>
          <Route path="/gardenView">
            <GardenView />
          </Route>
          <Route path="/createGarden">
            <CreateGarden />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
