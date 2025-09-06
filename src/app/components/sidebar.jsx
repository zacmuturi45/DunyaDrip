// components/Sidebar.jsx

import Image from 'next/image';
import { useAuth } from '../contexts/auth_context';
import supabse_image_path from '@/utils/supabase/supabse_image_path';
import Link from 'next/link';

const sections = [
  { key: 'home', label: 'Home', img: "dash_home.svg", link: "/" },
  { key: 'account', label: 'Account', img: "account.svg", link: "" },
  { key: 'orders', label: 'Orders', img: "white_bag.svg", link: "" },
  { key: 'addresses', label: 'Addresses', img: "address.svg", link: "" },
  { key: 'profile_settings', label: 'Profile', img: "white_profile.svg", link: "" },
  { key: 'settings', label: 'Settings', img: "settings.svg", link: "" }
];

export default function Sidebar() {
  const { activeSection, setActiveSection } = useAuth();

  return (
    <div className="sidebar">
      {/* <div className="home_button">
        <div className="home_button_container">
          <Image src={supabse_image_path('/dash_home.svg')} width={100} height={100} alt='dash_home_svg' className='home_button_svg' />
          <Link href={"/"} className='next-link home-link'><span>Home</span></Link>
        </div>
      </div> */}
      <ul className="sidebar-menu">
        {sections.map((section) => (
          <Link
            className='white-link'
            href={section.link}
            key={section.img}
            >
            <li
              key={section.key}
              className={`sidebar-item ${activeSection === section.key ? 'active' : ''}`}
              onClick={() => setActiveSection(section.key)}
            >
              <Image src={supabse_image_path(`/${section.img}`)} alt="icon" width={20} height={20} className='sidebar-img' />
              <span className="sidebar-label">{section.label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
