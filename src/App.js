import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import { RestrictedRoute } from "./routes/restrictedRoutes";
import { PrivateRoute } from "./routes/privateRoutes";

const LazyHomePage = lazy(() => import("./pages/HomePage/HomePage"));
const LazyRegister = lazy(() => import("./pages/Register/Register"));
const LazyLogin = lazy(() => import("./pages/Login/Login"));
const LazyNotFound = lazy(() => import("./pages/NotFound/NotFound"));
const LazyUserDiary = lazy(() => import("./pages/Diary/Diary"));
const LazyUserCalc = lazy(() => import("./pages/Calculator/Calculator"));

function App() {
  return (
    <HashRouter>
      {/* <BrowserRouter> */}
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              <RestrictedRoute
                redirectTo="/diary"
                component={<LazyHomePage />}
              />
            }
          ></Route>
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/diary" component={<LazyLogin />} />
            }
          ></Route>
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/diary"
                component={<LazyRegister />}
              />
            }
          ></Route>
          <Route
            path="/diary"
            element={
              <PrivateRoute redirectTo="/login" component={<LazyUserDiary />} />
            }
          ></Route>
          <Route
            path="/calculator"
            element={
              <PrivateRoute redirectTo="/login" component={<LazyUserCalc />} />
            }
          ></Route>
          <Route path="*" element={<LazyNotFound />}></Route>
        </Routes>
      </Suspense>
      {/* </BrowserRouter> */}
    </HashRouter>
  );
}

export default App;
