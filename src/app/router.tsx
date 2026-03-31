import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppShell } from '@/src/components/layout/AppShell';
import { useAuthStore } from '@/src/stores/authStore';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { ErrorBoundary } from '@/src/components/shared/ErrorBoundary';

import DashboardPage from '../pages/dashboard/DashboardPage';
import UsersPage from '../pages/users/UsersPage';
import LoginPage from '../pages/auth/LoginPage';
import ComponentShowcasePage from '../pages/utilities/ComponentShowcasePage';
import PlaceholderPage from '../pages/shared/PlaceholderPage';

const PageLoader = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-[200px]" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
    </div>
    <Skeleton className="h-[400px]" />
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'utilities',
        element: <ComponentShowcasePage />,
      },
      {
        path: 'registration',
        element: <PlaceholderPage />,
      },
      {
        path: 'society',
        element: <PlaceholderPage />,
      },
      {
        path: 'homes',
        element: <PlaceholderPage />,
      },
      {
        path: 'staff',
        element: <PlaceholderPage />,
      },
      {
        path: 'vendors',
        element: <PlaceholderPage />,
      },
      {
        path: 'vendor-master',
        element: <PlaceholderPage />,
      },
      {
        path: 'inventory',
        element: <PlaceholderPage />,
      },
      {
        path: 'stock',
        element: <PlaceholderPage />,
      },
      {
        path: 'procurement',
        element: <PlaceholderPage />,
      },
      {
        path: 'products',
        element: <PlaceholderPage />,
      },
      {
        path: 'add-product',
        element: <PlaceholderPage />,
      },
      {
        path: 'lookup',
        element: <PlaceholderPage />,
      },
      {
        path: 'settings',
        element: <PlaceholderPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
