import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import AppShell from './components/AppShell';
import ClubhouseHomePage from './pages/ClubhouseHomePage';
import ParentPortalPage from './pages/ParentPortalPage';
import ToursInterviewsBookingPage from './pages/ToursInterviewsBookingPage';

const rootRoute = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ClubhouseHomePage,
});

const parentPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/parent-portal',
  component: ParentPortalPage,
});

const toursRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tours',
  component: ToursInterviewsBookingPage,
});

const routeTree = rootRoute.addChildren([indexRoute, parentPortalRoute, toursRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
