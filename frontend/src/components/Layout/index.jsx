import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import LoadingSpinner from '../LoadingSpinner';

const Layout = () => (
  <div className="d-flex flex-column h-100">
    <Navbar />

    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  </div>
);

export default Layout;
