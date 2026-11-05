import React from 'react';
import { useRouter } from './router';
import { useOwnerStore } from './store/ownerStore';

// Owner Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { PropertyList } from './pages/PropertyList';
import { AddProperty } from './pages/AddProperty';
import { PropertyOverview } from './pages/PropertyOverview';
import { RoomManagement } from './pages/RoomManagement';
import { RoomDetailEdit } from './pages/RoomDetailEdit';
import { BookingList } from './pages/BookingList';
import { BookingDetail } from './pages/BookingDetail';
import { Partnership } from './pages/Partnership';
import { PartnershipTerms } from './pages/PartnershipTerms';
import { OwnerProfile } from './pages/OwnerProfile';

// Simulator
import { OwnerSimulatorBar } from './components/OwnerSimulatorBar';

export const App: React.FC = () => {
  const { path } = useRouter();
  const { owner } = useOwnerStore();

  const cleanPath = path.split('?')[0].replace(/\/+$/, '') || '/';

  // Auth pages
  if (cleanPath === '/login') {
    return (
      <>
        <Login />
        <OwnerSimulatorBar />
      </>
    );
  }

  if (cleanPath === '/register') {
    return (
      <>
        <Register />
        <OwnerSimulatorBar />
      </>
    );
  }

  // If not logged in, redirect to login
  if (!owner) {
    return (
      <>
        <Login />
        <OwnerSimulatorBar />
      </>
    );
  }

  // Dashboard & Profile
  if (cleanPath === '/' || cleanPath === '/dashboard') {
    return (
      <>
        <Dashboard />
        <OwnerSimulatorBar />
      </>
    );
  }

  if (cleanPath === '/properties') {
    return (
      <>
        <PropertyList />
        <OwnerSimulatorBar />
      </>
    );
  }

  if (cleanPath === '/properties/add') {
    return (
      <>
        <AddProperty />
        <OwnerSimulatorBar />
      </>
    );
  }

  if (cleanPath === '/profile') {
    return (
      <>
        <OwnerProfile />
        <OwnerSimulatorBar />
      </>
    );
  }

  // Match /properties/:propId/partnership/terms
  const propTermsMatch = cleanPath.match(/^\/properties\/([^/]+)\/partnership\/terms$/);
  if (propTermsMatch) {
    return (
      <>
        <PartnershipTerms propertyId={propTermsMatch[1]} />
        <OwnerSimulatorBar />
      </>
    );
  }

  // Match /properties/:propId/partnership
  const propPartnershipMatch = cleanPath.match(/^\/properties\/([^/]+)\/partnership$/);
  if (propPartnershipMatch) {
    return (
      <>
        <Partnership propertyId={propPartnershipMatch[1]} />
        <OwnerSimulatorBar />
      </>
    );
  }

  // Match /properties/:propId/bookings/:bookingId
  const propBookingDetailMatch = cleanPath.match(/^\/properties\/([^/]+)\/bookings\/([^/]+)$/);
  if (propBookingDetailMatch) {
    return (
      <>
        <BookingDetail propertyId={propBookingDetailMatch[1]} bookingId={propBookingDetailMatch[2]} />
        <OwnerSimulatorBar />
      </>
    );
  }

  // Match /properties/:propId/bookings
  const propBookingsMatch = cleanPath.match(/^\/properties\/([^/]+)\/bookings$/);
  if (propBookingsMatch) {
    return (
      <>
        <BookingList propertyId={propBookingsMatch[1]} />
        <OwnerSimulatorBar />
      </>
    );
  }

  // Match /properties/:propId/rooms/add
  const propRoomAddMatch = cleanPath.match(/^\/properties\/([^/]+)\/rooms\/add$/);
  if (propRoomAddMatch) {
    return (
      <>
        <RoomDetailEdit propertyId={propRoomAddMatch[1]} />
        <OwnerSimulatorBar />
      </>
    );
  }

  // Match /properties/:propId/rooms/:roomId
  const propRoomDetailMatch = cleanPath.match(/^\/properties\/([^/]+)\/rooms\/([^/]+)$/);
  if (propRoomDetailMatch) {
    return (
      <>
        <RoomDetailEdit propertyId={propRoomDetailMatch[1]} roomId={propRoomDetailMatch[2]} />
        <OwnerSimulatorBar />
      </>
    );
  }

  // Match /properties/:propId/rooms
  const propRoomsMatch = cleanPath.match(/^\/properties\/([^/]+)\/rooms$/);
  if (propRoomsMatch) {
    return (
      <>
        <RoomManagement propertyId={propRoomsMatch[1]} />
        <OwnerSimulatorBar />
      </>
    );
  }

  // Match /properties/:propId (Overview)
  const propOverviewMatch = cleanPath.match(/^\/properties\/([^/]+)$/);
  if (propOverviewMatch) {
    return (
      <>
        <PropertyOverview propertyId={propOverviewMatch[1]} />
        <OwnerSimulatorBar />
      </>
    );
  }

  // Default fallback to Dashboard
  return (
    <>
      <Dashboard />
      <OwnerSimulatorBar />
    </>
  );
};
