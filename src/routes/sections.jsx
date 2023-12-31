import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const InjectorPage = lazy(() => import('src/pages/injector-tools'));
export const ReadPage = lazy(() => import('src/pages/read-tools'));
export const HistoryPage = lazy(() => import('src/pages/history-inject'));
// export const BlogPage = lazy(() => import('src/pages/blog'));
// export const UserPage = lazy(() => import('src/pages/user'));
// export const LoginPage = lazy(() => import('src/pages/login'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        // { element: <IndexPage />, index: true },
        { element: <Navigate to="/inject" replace />, index: true },
        { path: 'inject', element: <InjectorPage /> },
        { path: 'read', element: <ReadPage /> },
        { path: 'history', element: <HistoryPage /> },
        // { path: 'user', element: <UserPage /> },
        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    // {
    //   path: 'login',
    //   element: <LoginPage />,
    // },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
