// components/admin_sidebar.jsx
'use client';

import Image from 'next/image';
import { useAuth } from '../contexts/auth_context';
import supabse_image_path from '@/utils/supabase/supabse_image_path';
import { analytics, dashboard, newsletter, offers, products, settings } from '../../../public/imports';
import Link from 'next/link';

export default function AdminSidebar() {
    const { setActiveSection, activeSection } = useAuth();

    const iconMap = {
        dashboard: dashboard,     // Add this file if needed
        analytics: analytics,
        products: products,
        offers: offers,           // Add this file if needed
        newsletter: newsletter,
        settings: settings,
    };

    const links = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'analytics', label: 'Analytics' },
        { id: 'products', label: 'Products' },
        { id: 'offers', label: 'Offers' },
        { id: 'newsletter', label: 'Newsletter' },
        { id: 'settings', label: 'Settings' },
    ];

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-container">
                <Link href={"/"} style={{ textDecoration: 'none' }}>
                <div className='admin-logo'>
                    <div className='admin-image'>
                        <Image
                            src={supabse_image_path("dunyatransparent.png")}
                            height={100}
                            width={100}
                            alt='dunya_logo'
                        />
                    </div>
                    <div className='admin-image-text'>
                        <p>Dunya</p>
                        <p>Drip</p>
                    </div>
                </div>
                </Link>

                <div className='admin-links'>
                    <div className="links-list">
                        {links.map((link) => (
                            <div
                                key={link.id}
                                className={activeSection === link.id ? 'active linky' : 'linky'}
                                onClick={() => setActiveSection(link.id)}
                            >
                                <div className="link-icon-label">
                                    <Image
                                        src={iconMap[link.id]}
                                        alt={`${link.label} icon`}
                                        width={20}
                                        height={20}
                                        className="link-icon"
                                    />
                                    <span>{link.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
