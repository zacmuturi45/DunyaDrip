'use client';
import { Suspense, lazy } from 'react';
import SectionLoader from '../components/section_loader';
import { useAuth } from '../contexts/auth_context';
import AdminSidebar from '../components/adminsidebar';

const DashboardHome = lazy(() => import('../components/admin/dashboard_home'));
const Analytics = lazy(() => import('../components/admin/analytics'));
const Products = lazy(() => import('../components/admin/products'));
const Offers = lazy(() => import('../components/admin/offers'));
const Newsletter = lazy(() => import('../components/admin/newsletter'));
const Settings = lazy(() => import('../components/admin/settings'));

export default function AdminDashboard() {
  const { activeSection } = useAuth();

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardHome />;
      case 'analytics': return <Analytics />;
      case 'products': return <Products />;
      case 'offers': return <Offers />;
      case 'newsletter': return <Newsletter />;
      case 'settings': return <Settings />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar />
      <div className="dashboard-content">
        <Suspense fallback={<SectionLoader />}>
          {renderSection()}
        </Suspense>
      </div>
    </div>
  );
}
