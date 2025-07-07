// components/Dashboard.jsx

'use client';
import { useEffect, Suspense, lazy } from 'react';
import Sidebar from '../components/sidebar';
import SectionLoader from '../components/section_loader';
import { useAuth } from '../contexts/auth_context';

const Orders = lazy(() => import('../sections/orders'));
const Profile = lazy(() => import('../sections/profile'));
const Addresses = lazy(() => import('../sections/addresses'));
const Newsletter = lazy(() => import('../sections/newsletter'));
const ProfileSettings = lazy(() => import('../sections/profile_settings'));
const Settings = lazy(() => import('../sections/settings'));

export default function Dashboard() {
  const { activeSection } = useAuth();

  const renderSection = () => {
    switch (activeSection) {
      case 'account': return <Profile />;
      case 'orders': return <Orders />;
      case 'addresses': return <Addresses />;
      case 'newsletter': return <Newsletter />;
      case 'profile_settings': return <ProfileSettings />;
      case 'settings': return <Settings />;
      default: return <Profile />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Suspense fallback={<SectionLoader />}>
          {renderSection()}
        </Suspense>
      </div>
    </div>
  );
}
