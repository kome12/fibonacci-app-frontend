// import Button from '@material-ui/core/Button'
// import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Header } from './components/Header'
import { CreateGarden } from './pages/CreateGarden'
import { GardenView } from './pages/GardenView'
import { Home } from './pages/Home'
import { MyGardens } from './pages/MyGardens'

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <Router>
          <Header />
          <Switch>
            <Route path="/myGardens" component={MyGardens} />
            <Route path="/gardenView/:gardenId" component={GardenView} />
            <Route path="/createGarden" component={CreateGarden} />
            <Route path="/" component={Home} />
          </Switch>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">
                  <Button variant="contained" color="primary">
                    Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/myGardens">
                  <Button variant="contained" color="primary">
                    My Current Gardens
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/gardenView">
                  <Button variant="contained" color="primary">
                    GardenView
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/createGarden">
                  <Button variant="contained" color="primary">
                    Create Garden
                  </Button>
                </Link>
              </li>
            </ul>
          </nav> */}
        </Router>
      </RecoilRoot>
    </div>
  );
};

export default App;
