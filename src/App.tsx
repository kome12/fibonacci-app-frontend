import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AppWrapper } from "./components/AppWrapper";
import { Routes } from "./routes";
const Loading = () => <div>Page Loading...</div>;
const App = () => {
  return (
    <div>
      <RecoilRoot>
        <AppWrapper>
          <Router>
            <Suspense fallback={<Loading />}>
              <Routes />
            </Suspense>
          </Router>
        </AppWrapper>
      </RecoilRoot>
    </div>
  );
};

export default App;
