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

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('profile');
  const pathname = usePathname();
  const { setShowNav } = useAuth();

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
      default:
        return <Orders />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="dashboard-content">
        {renderSection()}
      </div>
    </div>
  );
}
