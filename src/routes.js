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

/* Student imports*/

import ActivityView from 'src/views/teamb/ListActivities/ActivityView';
import ActivityOneView from 'src/views/teamb/activitiesView/ActivityOneView';
import ActivityTwoView from 'src/views/teamb/activitiesView/ActivityTwoView';
import ActivityThreeView from 'src/views/teamb/activitiesView/ActivityThreeView';
import ActivityFourView from 'src/views/teamb/activitiesView/ActivityFourView';
import ActivityFiveView from 'src/views/teamb/activitiesView/ActivityFiveView';
import ActivitySixView from 'src/views/teamb/activitiesView/ActivitySixView';
import StudentListActivitiesView from 'src/views/teamb/ListActivities';
import ActivityStudentView from 'src/views/teamb/ActivityInfoView';
import StudentDashboardLayout from 'src/layouts/StudentDashboardLayout';
/* End Student Imports*/

/* Coordinator imports */
import CoordinatorDashboardLayout from 'src/layouts/CoordinatorDashboardLayout';

//import StudentView from 'src/views/teamc/coordinator/StudentInfoView';
//StartImports teamD
import AdministerView from 'src/views/teamd/coordinator/GI/index';
import AdministerPlacesView from 'src/views/teamd/coordinator/places/index';
import AdministerProfessorsView from 'src/views/teamd/coordinator/professors/index';
import { CreateOtherView } from './views/teamd/coordinator/createOthers';
import { CreateUserView } from './views/teamd/coordinator/users/CreateUser';
import { ManageView } from './views/teamd/director/manage-GI/index';
//import FreeSoloCreateOptionDialog from 'src/views/teamd/Search/prueba'
//EndImports TeamD

//import CoordinatorListStudentsView from 'src/views/teamc/coordinator/StudentTracking/ListStudentsView';
import StudentView from 'src/views/teamc/coordinator/StudentTracking/StudentInfoView';
//import CoordinatorListActivitiesView from 'src/views/teamc/coordinator/ActivityEvaluationsView/index';

import CoordinatorListStudentsView from 'src/views/teamc/coordinator/StudentTracking/ListStudentsView';
import CoordinatorStudentView from 'src/views/teamc/coordinator/StudentTracking/StudentInfoView';
import CoordinatorListActivitiesView from 'src/views/teamc/coordinator/Activities/ListActivitiesView';
import CoordinatorActivityInfoView from 'src/views/teamc/coordinator/Activities/ActivityInfoView';
import CoordinatorListEvaluationsView from './views/teamc/coordinator/Evaluations/ListEvaluationsView';
import ReportsView from 'src/views/teamc/coordinator/ReportsView';

/* End Coordinator imports*/

/* Director imports */
import DirectorDashboardLayout from 'src/layouts/DirectorDashboardLayout';
import DirectorListStudentsView from 'src/views/teamc/director/Students/ListStudentsView';
import DirectorStudentView from 'src/views/teamc/director/Students/StudentInfoView';
import DirectorListActivitiesView from 'src/views/teamc/director/Activities/ListActivitiesView';
import DirectorActivityView from 'src/views/teamc/director/Activities/ActivityInfoView';
import DirectorListEvaluationsView from 'src/views/teamc/director/Evaluations/ListEvaluationsView';
/* End Director imports */
//Imports teamA

import RegisterGrantView from "src/views/teamA/coordinator/RegisterGrantView"
import RegisterAgreementView from "src/views/teamA/coordinator/RegisterAgreementView"
import AdministerStudentView from 'src/views/teamA/coordinator/index';
import AdministerProfileView from 'src/views/teamA/student/index';

const routes = [
  {
    path: 'director',
    element: <DirectorDashboardLayout />,
    children: [
      { path: '', element: <Navigate to="list-students"/> },
      { path: 'list-students', element: <DirectorListStudentsView /> },
      { path: 'list-students/student/:id', element: <DirectorStudentView /> },
      { path: 'list-activities', element: <DirectorListActivitiesView /> },
      {
        path: 'list-activities/activity/:id',
        element: <DirectorActivityView />
      },
      {
        path: 'manage-gi',
        element: <ManageView />
      },
      { path: 'list-evaluations', element: <DirectorListEvaluationsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  /* Coordinator routes */
  {
    path: 'coordinator',
    element: <CoordinatorDashboardLayout />,
    children: [
      { path: '', element: <Navigate to="list-students" /> },
      { path: 'list-students', element: <CoordinatorListStudentsView /> },
      {
        path: 'list-students/student/:id',
        element: <CoordinatorStudentView />
      },
      { path: '/account', element: <AccountView /> },
      //{ path: 'list-students/student/:id', element: <StudentView /> },
      { path: 'administer-student', element: <AdministerStudentView /> },
      { path: '/administer-Gi', element: <AdministerView /> },
      { path: '/administer-Places', element: <AdministerPlacesView /> },
      { path: '/administer-Professors', element: <AdministerProfessorsView /> },
      { path: '/create-others', element: <CreateOtherView /> },
      { path: '/administerUsers', element: <CreateUserView /> },
      { path: 'list-activities', element: <CoordinatorListActivitiesView /> },
      {
        path: 'list-activities/activity/:id',
        element: <CoordinatorActivityInfoView />
      },
      { path: 'list-evaluations', element: <CoordinatorListEvaluationsView /> },
      { path: 'reports', element: <ReportsView/>},
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'student',
    element: <StudentDashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'administer-profile', element: <AdministerProfileView /> },
      { path: 'list-activities/activityone', element: <ActivityOneView /> },
      { path: 'list-activities/activitytwo', element: <ActivityTwoView /> },
      { path: 'list-activities/activitythree', element: <ActivityThreeView /> },
      { path: 'list-activities/activityfour', element: <ActivityFourView /> },
      { path: 'list-activities/activityfive', element: <ActivityFiveView /> },
      { path: 'list-activities/activitysix', element: <ActivitySixView /> },
      { path: 'list-activities', element: <StudentListActivitiesView /> },
      { path: 'administer-profile/registerGrant', element: <RegisterGrantView /> },
      { path: 'administer-profile/registerAgreement', element: <RegisterAgreementView /> },
      {
        path: 'list-activities/activity/:id',
        element: <ActivityStudentView />
      },
      { path: 'list-activities', element: <ActivityView /> },
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
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
