import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Spinner from './spiner';

const HomePage = lazy(() => import('./pages/mainPage'));

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
          </Routes>
        </BrowserRouter>
    </>
  );
}
