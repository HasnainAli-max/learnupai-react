import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OrgnizationAnalytics from './pages/OrgnizationAnalytics';
import Layout from './layout/Layout';
import EmployAnalytics from './pages/EmployAnalytics';
import PlanAnalytics from './pages/PlanAnalytics';
import FeedBackAnalytics from './pages/FeedBackAnalytics';
import ReportList from './pages/ReportList';

const App = () => {
  return (
    // <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="orgnization-analytics" element={<OrgnizationAnalytics />} />
          <Route path="employee-analytics" element={<EmployAnalytics />} />
          <Route path="learning-plan" element={<PlanAnalytics />} />
          <Route path="feedback" element={<FeedBackAnalytics />} />
          <Route path="reports" element={<ReportList />} />
          {/* <Route path="team-analytics" element={<TeamAnalytics />} /> */}
        </Route>
      </Routes>
    // </Router>
  );
};

export default App;
