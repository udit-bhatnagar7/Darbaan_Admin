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
const ProductListPage = lazy(() => import('../pages/shopping/ProductListPage'));
const FeedbackPage = lazy(() => import('../pages/support/FeedbackPage'));
const VendorMasterPage = lazy(() => import('../pages/vendors/VendorMasterPage'));
const LookupDataPage = lazy(() => import('../pages/lookup/LookupDataPage'));

// New Pages
const AIInsightsPage = lazy(() => import('../pages/ai/AIInsightsPage'));
const AIAutomationPage = lazy(() => import('../pages/ai/AIAutomationPage'));
const AnalyticsPage = lazy(() => import('../pages/analytics/AnalyticsPage'));
const ReportsPage = lazy(() => import('../pages/analytics/ReportsPage'));
const SettingsPage = lazy(() => import('../pages/settings/SettingsPage'));
const VisitorEntryPage = lazy(() => import('../pages/gate/VisitorEntryPage'));
const StaffEntryPage = lazy(() => import('../pages/gate/StaffEntryPage'));
const ServiceRequestsPage = lazy(() => import('../pages/services/ServiceRequestsPage'));
const MaintenancePage = lazy(() => import('../pages/services/MaintenancePage'));
const BookingsPage = lazy(() => import('../pages/amenities/BookingsPage'));
const FacilitiesPage = lazy(() => import('../pages/amenities/FacilitiesPage'));
const ParkingSlotsPage = lazy(() => import('../pages/parking/ParkingSlotsPage'));
const VehicleLogsPage = lazy(() => import('../pages/parking/VehicleLogsPage'));
const AnnouncementsPage = lazy(() => import('../pages/communication/AnnouncementsPage'));
const MessagesPage = lazy(() => import('../pages/communication/MessagesPage'));
const DocumentsPage = lazy(() => import('../pages/documents/DocumentsPage'));
const SocietyDocsPage = lazy(() => import('../pages/documents/SocietyDocsPage'));
const ResidentDocsPage = lazy(() => import('../pages/documents/ResidentDocsPage'));
const VendorDocsPage = lazy(() => import('../pages/documents/VendorDocsPage'));

// Finance Pages
const ExpensesPage = lazy(() => import('../pages/finance/ExpensesPage'));
const FinancialReportsPage = lazy(() => import('../pages/finance/FinancialReportsPage'));

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
        element: (
          <Suspense fallback={<PageLoader />}>
            <VendorMasterPage />
          </Suspense>
        ),
      },
      {
        path: 'lookup-data',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LookupDataPage />
          </Suspense>
        ),
      },
      // AI Engine
      {
        path: 'ai/insights',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AIInsightsPage />
          </Suspense>
        ),
      },
      {
        path: 'ai/automation',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AIAutomationPage />
          </Suspense>
        ),
      },
      // Analytics
      {
        path: 'analytics',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AnalyticsPage />
          </Suspense>
        ),
      },
      {
        path: 'reports',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ReportsPage />
          </Suspense>
        ),
      },
      // Gate
      {
        path: 'gate/visitors',
        element: (
          <Suspense fallback={<PageLoader />}>
            <VisitorEntryPage />
          </Suspense>
        ),
      },
      {
        path: 'gate/staff',
        element: (
          <Suspense fallback={<PageLoader />}>
            <StaffEntryPage />
          </Suspense>
        ),
      },
      // Services
      {
        path: 'services/requests',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ServiceRequestsPage />
          </Suspense>
        ),
      },
      {
        path: 'services/maintenance',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MaintenancePage />
          </Suspense>
        ),
      },
      // Amenities
      {
        path: 'amenities/bookings',
        element: (
          <Suspense fallback={<PageLoader />}>
            <BookingsPage />
          </Suspense>
        ),
      },
      {
        path: 'amenities/facilities',
        element: (
          <Suspense fallback={<PageLoader />}>
            <FacilitiesPage />
          </Suspense>
        ),
      },
      // Parking
      {
        path: 'parking/slots',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ParkingSlotsPage />
          </Suspense>
        ),
      },
      {
        path: 'parking/logs',
        element: (
          <Suspense fallback={<PageLoader />}>
            <VehicleLogsPage />
          </Suspense>
        ),
      },
      // Communication
      {
        path: 'communication/announcements',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AnnouncementsPage />
          </Suspense>
        ),
      },
      {
        path: 'communication/messages',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MessagesPage />
          </Suspense>
        ),
      },
      // Documents
      {
        path: 'documents',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DocumentsPage />
          </Suspense>
        ),
      },
      {
        path: 'documents/society',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SocietyDocsPage />
          </Suspense>
        ),
      },
      {
        path: 'documents/residents',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ResidentDocsPage />
          </Suspense>
        ),
      },
      {
        path: 'documents/vendors',
        element: (
          <Suspense fallback={<PageLoader />}>
            <VendorDocsPage />
          </Suspense>
        ),
      },
      // Finance
      {
        path: 'finance/expenses',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ExpensesPage />
          </Suspense>
        ),
      },
      {
        path: 'finance/reports',
        element: (
          <Suspense fallback={<PageLoader />}>
            <FinancialReportsPage />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductListPage />
          </Suspense>
        ),
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
        path: 'support/feedback',
        element: (
          <Suspense fallback={<PageLoader />}>
            <FeedbackPage />
          </Suspense>
        ),
      },
      {
        path: 'lookup',
        element: <PlaceholderPage />,
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SettingsPage />
          </Suspense>
        ),
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
