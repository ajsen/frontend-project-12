import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './Navbar';
import LoadingSpinner from '../common/LoadingSpinner';

const Layout = () => (
  <div className="d-flex flex-column h-100">
    <Navbar />

    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>

    <ToastContainer />
  </div>
);

export default Layout;
