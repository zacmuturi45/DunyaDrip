// components/Sidebar.jsx

import Image from 'next/image';
import { address, bag, pay, signin, white_bag, white_profile } from '../../../public/imports';

const sections = [
  { key: 'profile', label: 'Account', img: white_profile },
  { key: 'orders', label: 'Orders', img: white_bag },
  { key: 'addresses', label: 'Addresses', img: address },
  { key: 'payments', label: 'Payments', img: pay },
];

export default function Sidebar({ activeSection, setActiveSection }) {
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
            <Image src={section.img} alt="icon" width={20} height={20} className='sidebar-img' />
            <span className="sidebar-label">{section.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
