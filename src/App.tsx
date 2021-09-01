import { ThemeProvider } from "@material-ui/core";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Header } from "./components/Header";
import { Routes } from "./routes";
import { MyNiwaTheme } from "./utils/UITheme";

const Loading = () => <div>Page Loading...</div>;
const App = () => {
  return (
    <div>
      <RecoilRoot>
        <Router>
          <ThemeProvider theme={MyNiwaTheme}>
          <Header />
          <Suspense fallback={<Loading />}>
            <Routes />
          </Suspense>
          </ThemeProvider>
        </Router>
      </RecoilRoot>
    </div>
  );
};

export default App;
