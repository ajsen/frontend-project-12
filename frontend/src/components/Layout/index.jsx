import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './Navbar';
import Modal from '../Modal';
import LoadingSpinner from '../common/LoadingSpinner';

const Layout = () => (
  <>
    <Modal />
    <div className="d-flex flex-column h-100">
      <Navbar />

      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>

    </div>
    <ToastContainer />
  </>
);

export default Layout;
