import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import ActivityView from 'src/views/teamb/activities/ActivityView';
import ActivityOneView from 'src/views/teamb/activities/ActivityOneView';
import ActivityTwoView from 'src/views/teamb/activities/ActivityTwoView';
import ActivityThreeView from 'src/views/teamb/activities/ActivityThreeView';
import ActivityFourView from 'src/views/teamb/activities/ActivityFourView';
import ActivityFiveView from 'src/views/teamb/activities/ActivityFiveView';
import ActivitySixView from 'src/views/teamb/activities/ActivitySixView';
import EstudentDashboardLayout from 'src/layouts/EstudentDashboardLayout';

const routes = [
  {
    path: 'user',
    element: <EstudentDashboardLayout />,
    children: [
      { path: 'activity/activityone', element: <ActivityOneView />},
      { path: 'activity/activitytwo', element: <ActivityTwoView />},
      { path: 'activity/activitythree', element: <ActivityThreeView />},
      { path: 'activity/activityfour', element: <ActivityFourView />},
      { path: 'activity/activityfive', element: <ActivityFiveView />},
      { path: 'activity/activitysix', element: <ActivitySixView />},
      { path: 'activity', element: <ActivityView />},
      { path: 'activities', element: <ActivityView />},
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
