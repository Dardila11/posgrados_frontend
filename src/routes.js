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
import StudentDashboardLayout from 'src/layouts/StudentDashboardLayout';

/* Coordinator imports */
import CoordinatorDashboardLayout from 'src/layouts/CoordinatorDashboardLayout';
import CoordinatorListStudentsView from 'src/views/teamc/coordinator/StudentTracking/ListStudentsView';
import StudentView from 'src/views/teamc/coordinator/StudentTracking/StudentInfoView';
import CoordinatorListActivitiesView from 'src/views/teamc/coordinator/ActivityEvaluationsView/index';
/* End Coordinator imports*/
/* Director imports */
import DirectorDashboardLayout from 'src/layouts/DirectorDashboardLayout';
import DirectorIndexView from 'src/views/teamc/director/index';
import DirectorListStudentsView from 'src/views/teamc/director/ListStudentsView/index';
import DirectorListActivitiesView from 'src/views/teamc/director/ActivityEvaluationsView/index';
/* End Director imports */
const routes = [
  {
    path: 'director',
    element: <DirectorDashboardLayout />,
    children: [
      { path: '', element: <DirectorIndexView /> },
      { path: 'list-students', element: <DirectorListStudentsView /> },
      { path: 'list-students/student/:id', element: <StudentView /> },
      { path: 'list-activities', element: <DirectorListActivitiesView /> },
      { path: 'list-activities/activity/:id', element: <StudentView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  /* Coordinator routes */
  {
    path: 'coordinator',
    element: <CoordinatorDashboardLayout />,
    children: [
      { path: 'list-students', element: <CoordinatorListStudentsView /> },
      { path: 'list-students/student/:id', element: <StudentView /> },
      { path: 'list-activities', element: <CoordinatorListActivitiesView /> },
      { path: 'list-activities/activity/:id', element: <StudentView /> },
      { path: '*', element: <Navigate to="/404" /> }
      ]
  },
  {
    path: 'student',
    element: <StudentDashboardLayout />,
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
