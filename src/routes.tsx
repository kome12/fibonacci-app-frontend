import { Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { CreateGarden } from "./pages/CreateGarden";
import { GardenView } from "./pages/GardenView";
import { Home } from "./pages/Home";
import { MyGardens } from "./pages/MyGardens";
import { useUserState } from "./store/user/useUserState";

const NotFound = () => <div>Page Not Found</div>;
const Loading = () => <div>Page Loading...</div>;

export const Routes = () => {
  const location = useLocation();
  const { userData: isUserLoggedIn } = useUserState();

  return (
    <Suspense fallback={<Loading />}>
      <Switch location={location}>
        {isUserLoggedIn && (
          <Route path="/user">
            <Route path="/user/myGardens" component={MyGardens} exact />
            <Route
              path="/user/gardenView/:gardenId"
              component={GardenView}
              exact
            />
            <Route path="/user/createGarden" component={CreateGarden} exact />
          </Route>
        )}
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};
