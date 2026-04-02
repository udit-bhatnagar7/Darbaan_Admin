import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppShell } from '@/src/components/layout/AppShell';
import { useAuthStore } from '@/src/stores/authStore';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { ErrorBoundary } from '@/src/components/shared/ErrorBoundary';

import DashboardPage from '../pages/dashboard/DashboardPage';
import UsersPage from '../pages/users/UsersPage';
import AuthPage from '../pages/auth/AuthPage';
import ComponentShowcasePage from '../pages/utilities/ComponentShowcasePage';
import PlaceholderPage from '../pages/shared/PlaceholderPage';

// V3 Pages
const QuickLinksPage = lazy(() => import('../pages/quick-links/QuickLinksPage'));
const DuePaymentsPage = lazy(() => import('../pages/billing/DuePaymentsPage'));
const LeadsPage = lazy(() => import('../pages/leads/LeadsPage'));
const LeadDetailPage = lazy(() => import('../pages/leads/LeadDetailPage'));
const ReferralPage = lazy(() => import('../pages/public/ReferralPage'));
const ReferralsPage = lazy(() => import('../pages/leads/ReferralsPage'));
const PaymentLinksPage = lazy(() => import('../pages/billing/PaymentLinksPage'));
const OffersPage = lazy(() => import('../pages/billing/OffersPage'));
const NotificationsPage = lazy(() => import('../pages/notifications/NotificationsPage'));
const DesignSystemPage = lazy(() => import('../pages/settings/DesignSystemPage'));
const StaffManagementPage = lazy(() => import('../pages/staff/StaffManagementPage'));
const CommunityStaffPage = lazy(() => import('../pages/staff/CommunityStaffPage'));
const RegistrationPage = lazy(() => import('../pages/registration/RegistrationPage'));
const AddAmenityPage = lazy(() => import('../pages/registration/AddAmenityPage'));
const SocietyPage = lazy(() => import('../pages/society/SocietyPage'));
const HomesPage = lazy(() => import('../pages/homes/HomesPage'));
const VendorsPage = lazy(() => import('../pages/vendors/VendorsPage'));
const InventoryDashboard = lazy(() => import('../pages/shopping/InventoryDashboard'));
const ProductStockPage = lazy(() => import('../pages/shopping/ProductStockPage'));
const AddProductPage = lazy(() => import('../pages/shopping/AddProductPage'));
const ProcurementPage = lazy(() => import('../pages/shopping/ProcurementPage'));

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
    element: <AuthPage />,
  },
  {
    path: '/public/refer',
    element: (
      <Suspense fallback={<PageLoader />}>
        <ReferralPage />
      </Suspense>
    ),
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
        path: 'quick-links',
        element: (
          <Suspense fallback={<PageLoader />}>
            <QuickLinksPage />
          </Suspense>
        ),
      },
      {
        path: 'leads',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LeadsPage />
          </Suspense>
        ),
      },
      {
        path: 'leads/referrals',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ReferralsPage />
          </Suspense>
        ),
      },
      {
        path: 'leads/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LeadDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'billing/payment-links',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PaymentLinksPage />
          </Suspense>
        ),
      },
      {
        path: 'billing/due-payments',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DuePaymentsPage />
          </Suspense>
        ),
      },
      {
        path: 'billing/offers',
        element: (
          <Suspense fallback={<PageLoader />}>
            <OffersPage />
          </Suspense>
        ),
      },
      {
        path: 'notifications',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotificationsPage />
          </Suspense>
        ),
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
        path: 'settings/design-system',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DesignSystemPage />
          </Suspense>
        ),
      },
      {
        path: 'registration',
        element: (
          <Suspense fallback={<PageLoader />}>
            <RegistrationPage />
          </Suspense>
        ),
      },
      {
        path: 'registration/add-amenity',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AddAmenityPage />
          </Suspense>
        ),
      },
      {
        path: 'society',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SocietyPage />
          </Suspense>
        ),
      },
      {
        path: 'homes',
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomesPage />
          </Suspense>
        ),
      },
      {
        path: 'staff',
        element: (
          <Suspense fallback={<PageLoader />}>
            <StaffManagementPage />
          </Suspense>
        ),
      },
      {
        path: 'community-staff',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CommunityStaffPage />
          </Suspense>
        ),
      },
      {
        path: 'vendors',
        element: (
          <Suspense fallback={<PageLoader />}>
            <VendorsPage />
          </Suspense>
        ),
      },
      {
        path: 'vendor-master',
        element: <PlaceholderPage />,
      },
      {
        path: 'inventory',
        element: (
          <Suspense fallback={<PageLoader />}>
            <InventoryDashboard />
          </Suspense>
        ),
      },
      {
        path: 'stock',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductStockPage />
          </Suspense>
        ),
      },
      {
        path: 'procurement',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProcurementPage />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: <PlaceholderPage />,
      },
      {
        path: 'add-product',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AddProductPage />
          </Suspense>
        ),
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
