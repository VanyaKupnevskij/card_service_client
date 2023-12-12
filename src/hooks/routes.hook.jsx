import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import RecordsPage from '../pages/Records/RecordsPage';
import StatisticPage from '../pages/Statistic/StatisticPage';

export function useRoutes() {
  return (
    <Routes>
      <Route index path="/records" exact element={<RecordsPage />} />
      <Route path="/statistic" exact element={<StatisticPage />} />

      <Route path="*" element={<Navigate to="/records" />} />
    </Routes>
  );
}
