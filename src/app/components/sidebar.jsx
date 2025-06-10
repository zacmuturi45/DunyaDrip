// components/Sidebar.jsx

import Image from 'next/image';
import { useAuth } from '../contexts/auth_context';
import supabse_image_path from '@/utils/supabase/supabse_image_path';

const sections = [
  { key: 'profile', label: 'Account', img: "white_profile.svg" },
  { key: 'orders', label: 'Orders', img: "white_bag.svg" },
  { key: 'addresses', label: 'Addresses', img: "address.svg" },
  { key: 'payments', label: 'Payments', img: "pay.svg" },
  { key: 'settings', label: 'Settings', img: "settings.svg"}
];

export default function Sidebar() {
  const { activeSection, setActiveSection } = useAuth();

  return (
    <div className="sidebar">
      {/* <div className="sidebar-header">
        <Image src={signin} alt="logo" width={30} height={30} />
        <span className="brand-name">Dunya Drip</span>
      </div> */}
      <ul className="sidebar-menu">
        {sections.map((section) => (
          <li
            key={section.key}
            className={`sidebar-item ${activeSection === section.key ? 'active' : ''}`}
            onClick={() => setActiveSection(section.key)}
          >
            <Image src={supabse_image_path(`/${section.img}`)} alt="icon" width={20} height={20} className='sidebar-img' />
            <span className="sidebar-label">{section.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
