import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ClientsPage from '../pages/Clients/ClientsPage';
import OrdersPage from '../pages/Orders/OrdersPage';
import OrdersDetailsPage from '../pages/OrdersDetails/OrdersDetailsPage';
import ProductsPage from '../pages/Products/ProductsPage';
import CategoriesPage from '../pages/Categories/CategoriesPage';
import StatisticPage from '../pages/Statistic/StatisticPage';

export function useRoutes() {
  return (
    <Routes>
      <Route index path="/clients" exact element={<ClientsPage />} />
      <Route path="/orders" exact element={<OrdersPage />} />
      <Route path="/ordersdetails" exact element={<OrdersDetailsPage />} />
      <Route path="/products" exact element={<ProductsPage />} />
      <Route path="/categories" exact element={<CategoriesPage />} />
      <Route path="/statistic" exact element={<StatisticPage />} />

      <Route path="*" element={<Navigate to="/clients" />} />
    </Routes>
  );
}
