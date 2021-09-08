import { AnimatePresence } from "framer-motion";
import React, { Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Loading } from "./components/LoadingWrapper/Loading";
import { UserViewLayout } from "./components/UserViewLayout";
import { useUserState } from "./store/user/useUserState";

const About = React.lazy(() =>
  import("./pages/About").then(({ About }) => ({ default: About }))
);

const Home = React.lazy(() =>
  import("./pages/Home").then(({ Home }) => ({ default: Home }))
);

const MyNiwa = React.lazy(() =>
  import("./pages/MyNiwa").then(({ MyNiwa }) => ({ default: MyNiwa }))
);

const MyNiwaSettings = React.lazy(() =>
  import("./pages/Settings").then(({ MyNiwaSettings }) => ({
    default: MyNiwaSettings,
  }))
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
      <AnimatePresence>
        <Switch location={location}>
          {userData.isLoggedIn && (
            <Switch>
              <Route path="/user">
                <UserViewLayout showHeader showBottomNav>
                  <Route path="/user/myniwa" component={MyNiwa} exact />
                  <Route
                    path="/user/myniwa/:gardenId/settings"
                    component={MyNiwaSettings}
                    exact
                  />
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
                </UserViewLayout>
              </Route>
              <Route path="/about" component={About} exact />
              <Route path="/" component={Home} exact />
              <Route component={NotFound} />
            </Switch>
          )}
          <Route path="/about" component={About} exact />
          <Route path="/" component={Home} exact />
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
    </Suspense>
  );
};
