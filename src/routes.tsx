import React, { Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { UserViewLayout } from "./components/UserViewLayout";
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
const DailyGardening = React.lazy(() =>
  import("./pages/DailyGardening").then(({ DailyGardening }) => ({
    default: DailyGardening,
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
            <UserViewLayout showHeader={true} showBottomNav={true}>
              <Route path="/user">
                <Route path="/user/myGardens" component={MyGardens} exact />
                <Route
                  path="/user/dailyGardening/:gardenId"
                  component={DailyGardening}
                  exact
                />
                <Route
                  path="/user/createGarden"
                  component={CreateGarden}
                  exact
                />
              </Route>
            </UserViewLayout>
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
