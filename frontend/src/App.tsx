import React from 'react';
import { useRouter } from './router';
import { useAppStore } from './store/store';

// Customer Pages
import { Home } from './pages/customer/Home';
import { Search } from './pages/customer/Search';
import { PropertyDetail } from './pages/customer/PropertyDetail';
import { RoomDetail } from './pages/customer/RoomDetail';
import { BookingRequest } from './pages/customer/BookingRequest';
import { BookingStatus } from './pages/customer/BookingStatus';
import { PaymentSimulation } from './pages/customer/PaymentSimulation';
import { BookingConfirmation } from './pages/customer/BookingConfirmation';
import { BookingHistory } from './pages/customer/BookingHistory';
import { Profile } from './pages/customer/Profile';
import { Login } from './pages/customer/Login';
import { Register } from './pages/customer/Register';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { PropertyMonitoring } from './pages/admin/PropertyMonitoring';
import { PartnershipMonitoring } from './pages/admin/PartnershipMonitoring';
import { BookingMonitoring } from './pages/admin/BookingMonitoring';
import { UserMonitoring } from './pages/admin/UserMonitoring';

// Common Simulator
import { SimulatorBar } from './components/common/SimulatorBar';

export const App: React.FC = () => {
  const { path } = useRouter();
  const { currentUser } = useAppStore();

  // Matcher helper
  const cleanPath = path.split('?')[0].replace(/\/+$/, '') || '/';

  // =========================================================================
  // ADMIN PORTAL ROUTES (/admin/*)
  // =========================================================================
  if (cleanPath.startsWith('/admin')) {
    // If accessing admin without admin role, direct to AdminLogin unless on /admin/login
    if (cleanPath === '/admin/login') {
      return (
        <>
          <AdminLogin />
          <SimulatorBar />
        </>
      );
    }

    if (currentUser?.role !== 'admin') {
      return (
        <>
          <AdminLogin />
          <SimulatorBar />
        </>
      );
    }

    if (cleanPath === '/admin/properties') {
      return (
        <>
          <PropertyMonitoring />
          <SimulatorBar />
        </>
      );
    }
    if (cleanPath === '/admin/partnerships') {
      return (
        <>
          <PartnershipMonitoring />
          <SimulatorBar />
        </>
      );
    }
    if (cleanPath === '/admin/bookings') {
      return (
        <>
          <BookingMonitoring />
          <SimulatorBar />
        </>
      );
    }
    if (cleanPath === '/admin/users') {
      return (
        <>
          <UserMonitoring />
          <SimulatorBar />
        </>
      );
    }

    // Default admin: /admin or /admin/dashboard
    return (
      <>
        <AdminDashboard />
        <SimulatorBar />
      </>
    );
  }

  // =========================================================================
  // CUSTOMER PWA ROUTES (/*)
  // =========================================================================
  if (cleanPath === '/login') {
    return (
      <>
        <Login />
        <SimulatorBar />
      </>
    );
  }

  if (cleanPath === '/register') {
    return (
      <>
        <Register />
        <SimulatorBar />
      </>
    );
  }

  if (cleanPath === '/search') {
    return (
      <>
        <Search />
        <SimulatorBar />
      </>
    );
  }

  if (cleanPath === '/history') {
    return (
      <>
        <BookingHistory />
        <SimulatorBar />
      </>
    );
  }

  if (cleanPath === '/profile') {
    return (
      <>
        <Profile />
        <SimulatorBar />
      </>
    );
  }

  // Parameterized routes
  const propertyMatch = cleanPath.match(/^\/property\/([^/]+)$/);
  if (propertyMatch) {
    return (
      <>
        <PropertyDetail propertyId={propertyMatch[1]} />
        <SimulatorBar />
      </>
    );
  }

  const roomMatch = cleanPath.match(/^\/room\/([^/]+)$/);
  if (roomMatch) {
    return (
      <>
        <RoomDetail roomId={roomMatch[1]} />
        <SimulatorBar />
      </>
    );
  }

  const bookingMatch = cleanPath.match(/^\/booking\/([^/]+)$/);
  if (bookingMatch) {
    return (
      <>
        <BookingRequest roomId={bookingMatch[1]} />
        <SimulatorBar />
      </>
    );
  }

  const statusMatch = cleanPath.match(/^\/booking-status\/([^/]+)$/);
  if (statusMatch) {
    return (
      <>
        <BookingStatus bookingId={statusMatch[1]} />
        <SimulatorBar />
      </>
    );
  }

  const paymentMatch = cleanPath.match(/^\/payment\/([^/]+)$/);
  if (paymentMatch) {
    return (
      <>
        <PaymentSimulation bookingId={paymentMatch[1]} />
        <SimulatorBar />
      </>
    );
  }

  const confirmMatch = cleanPath.match(/^\/confirmation\/([^/]+)$/);
  if (confirmMatch) {
    return (
      <>
        <BookingConfirmation bookingId={confirmMatch[1]} />
        <SimulatorBar />
      </>
    );
  }

  // Default: Home
  return (
    <>
      <Home />
      <SimulatorBar />
    </>
  );
};
