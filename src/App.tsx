import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
        </Router>
      </RecoilRoot>
    </div>
  );
};

export default App;
