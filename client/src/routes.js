import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Login, About, Collection, WantList, Release, Search } from 'views';

const routes = (isLoggedIn) => [
  {
    path: '/',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/account', element: <Account /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      {
        path: 'member',
        element: <Outlet />,
        children: [
          { path: '/', element: <MemberGrid /> },
          { path: '/add', element: <AddMember /> }
        ]
      }
    ]
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/login" /> }
    ]
  }
];

export default routes;
