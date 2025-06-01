// components/Dashboard.jsx

'use client';
import { useEffect, useState } from 'react';
import Orders from '../sections/orders';
import Sidebar from '../components/sidebar';
import Profile from '../sections/profile';
import Addresses from '../sections/addresses';
import Newsletter from '../sections/newsletter';
import Payments from '../sections/payments';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/auth_context';
import Settings from '../sections/settings';

export default function Dashboard() {
  const pathname = usePathname();
  const { setShowNav, activeSection } = useAuth();

  useEffect(() => {
    pathname === "/dashboard" ? setShowNav(true) : setShowNav(false);
  }, [])

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'orders':
        return <Orders />;
      case 'addresses':
        return <Addresses />;
      case 'newsletter':
        return <Newsletter />;
      case 'payments':
        return <Payments />;
      case 'settings':
        return <Settings />;
      default:
        return <Orders />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        {renderSection()}
      </div>
    </div>
  );
}
