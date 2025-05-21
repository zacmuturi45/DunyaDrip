// components/Sidebar.jsx

import Image from 'next/image';
import { signin } from '../../../public/imports';

const sections = [
  { key: 'profile', label: 'Profile' },
  { key: 'orders', label: 'Orders' },
  { key: 'addresses', label: 'Addresses' },
  { key: 'newsletter', label: 'Newsletter' },
  { key: 'payments', label: 'Payments' },
];

export default function Sidebar({ activeSection, setActiveSection }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Image src={signin} alt="logo" width={30} height={30} />
        <span className="brand-name">Dunya Drip</span>
      </div>
      <ul className="sidebar-menu">
        {sections.map((section) => (
          <li
            key={section.key}
            className={`sidebar-item ${activeSection === section.key ? 'active' : ''}`}
            onClick={() => setActiveSection(section.key)}
          >
            <Image src={signin} alt="icon" width={20} height={20} />
            <span className="sidebar-label">{section.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
