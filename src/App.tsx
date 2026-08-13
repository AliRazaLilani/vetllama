import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import './App.css'
import { HelmetProvider } from 'react-helmet-async';
import { Loader } from './components/Loader';
import Home from './pages/Home/Home';
import MapGrid from './pages/MapGrid/MapGrid';


// const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.default })));

// const DoctorGrid = lazy(() => import('@/pages/MapGrid').then((m) => ({ default: m.default })))

function PageLoader() {
  return <Loader message="Loading..." fullScreen />;
}

function App() {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctor-grid" element={<MapGrid />} />
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
