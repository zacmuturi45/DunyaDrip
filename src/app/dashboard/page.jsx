// components/Dashboard.jsx

'use client';
import { useEffect, Suspense, lazy } from 'react';
import Sidebar from '../components/sidebar';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/auth_context';

const Orders = lazy(() => import('../sections/orders'));
const Profile = lazy(() => import('../sections/profile'));
const Addresses = lazy(() => import('../sections/addresses'));
const Newsletter = lazy(() => import('../sections/newsletter'));
const Payments = lazy(() => import('../sections/payments'));
const Settings = lazy(() => import('../sections/settings'));

export default function Dashboard() {
  const pathname = usePathname();
  const { setShowNav, activeSection } = useAuth();

  useEffect(() => {
    setShowNav(pathname === "/dashboard");
  }, [pathname, setShowNav])

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return <Profile />;
      case 'orders': return <Orders />;
      case 'addresses': return <Addresses />;
      case 'newsletter': return <Newsletter />;
      case 'payments': return <Payments />;
      case 'settings': return <Settings />;
      default: return <Orders />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Suspense fallback={<div>Loading section...</div>}>
          {renderSection()}
        </Suspense>
      </div>
    </div>
  );
}
