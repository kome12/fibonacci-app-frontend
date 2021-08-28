import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Header } from "./components/Header";
import { Routes } from "./routes";
const Loading = () => <div>Page Loading...</div>;
const App = () => {
  return (
    <div>
      <RecoilRoot>
        <Router>
          <Header />
          <Suspense fallback={<Loading />}>
            <Routes />
          </Suspense>
        </Router>
      </RecoilRoot>
    </div>
  );
};

export default App;
