import React from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';

import Mainpage from '../pages/Mainpage';
import Login from '../components/Login';
import Signup from '../components/Signup';

import RoleProtectedRoute from '@/Privaterole';

import DashboardHome from '@/adminpanel/AdminDashboard';
import AddSubtitleVideo from '@/pages/AddSubtitleVideo';

import ListUsers from '@/pages/ListUsers';
// import DeleteUser from '@/pages/DeleteUser';

import AdminLayout from '@/Layout/adminlayout';
import MainAdminLayout from '@/adminpanel/MainAdminLayout';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import Subtitle from '@/pages/Subtitle';
import Dubbing from '@/pages/Dubbing';
import AiArchiving from '@/pages/AiArchiving';
import Contact from '@/pages/Contact';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import UpdateProfile from '@/pages/UpdateProfile';
import PrivateRoute from '@/Privaterole/PrivateRoute';
import SettingSection from '@/pages/Settingsection';
import Profile from '@/pages/Profile';
import ProductTable from '@/pages/Producttable';

// 🧩 Layout to show Header/Footer conditionally
export const PublicLayout = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup';
  const hideHeader = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideHeader && <Header />}
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
};

const AppRoutes = () => (
  <Routes>

    {/* ✅ Home Page Protected by Auth */}
    <Route element={<PrivateRoute/>}>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Mainpage />} />
      </Route>
    </Route>

    {/* ✅ Public Routes */}
    <Route element={<PublicLayout />}>
      <Route path="/subtitle" element={<Subtitle />} />
      <Route path="/caption" element={<Navigate to="/subtitle" replace />} />
      <Route path="/dubbing" element={<Dubbing />} />
      <Route path="/ai-archiving" element={<AiArchiving />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/unauthorized" element={
        <div className='min-h-screen flex items-center justify-center text-2xl font-bold text-red-600'>
          Unauthorized Access
        </div>
      } />
    </Route>

    {/* ✅ User-only Protected Route */}
    <Route element={<RoleProtectedRoute allowedRoles={['user']} />}>
      <Route path="/update-profile" element={<UpdateProfile />} />
    </Route>

    {/* ✅ Admin-only Protected Routes */}
    <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
      <Route path="/admin/*" element={<MainAdminLayout />}>
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="productable" element={<ProductTable/>} />
        <Route path="add-subtitle-video" element={<AddSubtitleVideo />} />
        {/* <Route path="add-dubbing-video" element={<AddDubbingVideo />} /> */}
        <Route path="settings" element={<SettingSection/>} />
        <Route path="update-profile" element={<Profile/>} />
        <Route path="users" element={<ListUsers />} />
        {/* <Route path="delete-user" element={<DeleteUser />} /> */}
      </Route>
    </Route>
    
  </Routes>
);

export default AppRoutes;
