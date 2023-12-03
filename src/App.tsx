import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from "./spiner";
import UncontrolledComponentsFormPage from "./pages/uncontrolledComponentsFormPage";

const HomePage = lazy(() => import("./pages/mainPage"));
const ReactHookFormPage = lazy(() => import("./pages/reactHookFormPage"));

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/reactHookForm"
            element={
              <Suspense fallback={<Spinner />}>
                <ReactHookFormPage />
              </Suspense>
            }
          />
          <Route
            path="/uncontrolledComponentsForm"
            element={
              <Suspense fallback={<Spinner />}>
                <UncontrolledComponentsFormPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
