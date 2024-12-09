import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthRoutes } from './routes/AuthRoutes';
import { PrivateRoutes } from './routes/PrivateRoutes';
import { loadAppSettings } from './lib/settings';

export default function App() {
  useEffect(() => {
    loadAppSettings();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/*" element={<PrivateRoutes />} />
      </Routes>
    </Router>
  );
}