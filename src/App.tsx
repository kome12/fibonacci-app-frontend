import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Home } from "./pages/Home";
import { MyGardens } from "./pages/MyGardens/index";
import { GardenView } from "./pages/GardenView/index";
import { CreateGarden } from "./pages/CreateGarden/index";
import Button from '@material-ui/core/Button/index';
import './App.css';

const App = () => {
  return (
    <div className="App">
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/"><Button variant="contained" color="primary">Home</Button></Link>
            </li>
            <li>
              <Link to="/myGardens"><Button variant="contained" color="primary">My Current Gardens</Button></Link>
            </li>
            <li>
              <Link to="/gardenView"><Button variant="contained" color="primary">GardenView</Button></Link>
            </li>
            <li>
              <Link to="/createGarden"><Button variant="contained" color="primary">Create Garden</Button></Link>
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
