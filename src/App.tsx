import { ThemeProvider } from "@material-ui/core";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AppWrapper } from "./components/AppWrapper";
import { Loading } from "./components/LoadingWrapper/Loading";
import { Routes } from "./routes";
import { MyNiwaTheme } from "./utils/UITheme";

const App = () => {
  return (
    <div className="body-content">
      <RecoilRoot>
        <AppWrapper>
          <Router>
            <ThemeProvider theme={MyNiwaTheme}>
              <Suspense fallback={<Loading />}>
                <Routes />
              </Suspense>
            </ThemeProvider>
          </Router>
        </AppWrapper>
      </RecoilRoot>
    </div>
  );
};

export default App;
