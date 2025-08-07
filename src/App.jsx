import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminLogin from './admin/AdminLogin';
import Layout from './layout/Layout';
import Home from './pages/Home';
import OrgnizationAnalytics from './pages/OrgnizationAnalytics';
import EmployAnalytics from './pages/EmployAnalytics';
import PlanAnalytics from './pages/PlanAnalytics';
import FeedBackAnalytics from './pages/FeedBackAnalytics';
import ReportList from './pages/ReportList';
// import ProtectedRoute from './components/ProtectedRoute'; 
import ProtectedRoute from './protect/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<AdminLogin />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="orgnization-analytics" element={<OrgnizationAnalytics />} />
        <Route path="employee-analytics" element={<EmployAnalytics />} />
        <Route path="learning-plan" element={<PlanAnalytics />} />
        <Route path="feedback" element={<FeedBackAnalytics />} />
        <Route path="reports" element={<ReportList />} />
      </Route>
    </Routes>
  );
};

export default App;
