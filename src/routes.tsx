import React, { Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
<<<<<<< HEAD
import { About } from "./pages/About";
import { CreateGarden } from "./pages/CreateGarden";
import { GardenView } from "./pages/GardenView";
import { Home } from "./pages/Home";
import { MyGardens } from "./pages/MyGardens";
=======
import { Loading } from "./components/LoadingWrapper/Loading";
>>>>>>> a433826e4fdd0445cc89f3f4b068780e8a94947e
import { useUserState } from "./store/user/useUserState";
const Home = React.lazy(() =>
  import("./pages/Home").then(({ Home }) => ({ default: Home }))
);
const MyGardens = React.lazy(() =>
  import("./pages/MyGardens").then(({ MyGardens }) => ({ default: MyGardens }))
);
const GardenView = React.lazy(() =>
  import("./pages/GardenView").then(({ GardenView }) => ({
    default: GardenView,
  }))
);
const CreateGarden = React.lazy(() =>
  import("./pages/CreateGarden").then(({ CreateGarden }) => ({
    default: CreateGarden,
  }))
);

const NotFound = React.lazy(() =>
  import("./pages/NotFound").then(({ NotFound }) => ({
    default: NotFound,
  }))
);

export const Routes = () => {
  const location = useLocation();
  const { userData } = useUserState();
  if (userData.isLoggedIn === null) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Switch location={location}>
        {userData.isLoggedIn && (
          <Switch>
            <Route path="/user">
              <Route path="/user/myGardens" component={MyGardens} exact />
              <Route
                path="/user/gardenView/:gardenId"
                component={GardenView}
                exact
              />
              <Route path="/user/createGarden" component={CreateGarden} exact />
            </Route>
            <Route path="/" component={Home} exact />
            <Route component={NotFound} />
          </Switch>
        )}
        <Route path="/" component={Home} exact />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};
