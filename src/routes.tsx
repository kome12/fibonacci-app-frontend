import React, { Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { Loading } from "./components/LoadingWrapper/Loading";
import { useUserState } from "./store/user/useUserState";

const About = React.lazy(() => 
  import("./pages/About").then(({ About }) => ({ default: About }))
);
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
              <BottomNav />
            </Route>
            <Route path="/about" component={About} exact />
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
