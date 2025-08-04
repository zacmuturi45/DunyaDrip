'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { analytics, calendar, search } from '../../../../public/imports';
import supabse_image_path from '@/utils/supabase/supabse_image_path';
import Admin_dashboard_cards from '../admin_dashboard_cards';
import { createClient } from '@/utils/supabase/client';


export default function DashboardHome() {
  const today = new Date();

  const last30Days = new Date();
  last30Days.setDate(today.getDate() - 30);

  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    pendingDelivery: 0,
    totalRevenue: 0,
  });
  const [dateFilter, setDateFilter] = useState({
    'Total Revenue': last30Days,
    'Total Orders': last30Days,
    'Total Customers': last30Days,
    'Pending Delivery': last30Days,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const supabase = createClient;

        const [
          { count: totalOrders },
          { count: totalCustomers },
          { count: pendingDelivery },
          { data: revenueData, error: revenueError }
        ] = await Promise.all([
          supabase
            .from('client_orders')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', dateFilter['Total Orders'].toISOString()),

          supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', dateFilter['Total Customers'].toISOString()),

          supabase
            .from('client_orders')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending')
            .gte('created_at', dateFilter['Pending Delivery'].toISOString()),

          supabase
            .from('client_orders')
            .select('total')
            .eq('status', 'completed')
            .gte('created_at', dateFilter['Total Revenue'].toISOString()),
        ]);

        if (revenueError) throw revenueError;

        const totalCents = revenueData.reduce((sum, order) => sum + order.total, 0);
        const totalInGBP = (totalCents / 100).toFixed(2);

        setMetrics({
          totalOrders: totalOrders || 0,
          totalCustomers: totalCustomers || 0,
          pendingDelivery: pendingDelivery || 0,
          totalRevenue: `£${totalInGBP}`,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [
    dateFilter['Total Revenue'],
    dateFilter['Total Orders'],
    dateFilter['Total Customers'],
    dateFilter['Pending Delivery']
  ]); // rerun if filter changes

  // useEffect(() => {
  //   const fetchRevenue = async () => {
  //     const { data, error } = await createClient
  //       .from('client_orders')
  //       .select('total')
  //       .eq('status', 'completed')
  //       .gte('created_at', dateFilter['Total Revenue'].toISOString())

  //     if (error) {
  //       console.error('Error fetching total revenue:', error);
  //       return;
  //     }

  //     const totalCents = data.reduce((sum, order) => sum + order.total, 0);
  //     const totalInGBP = (totalCents / 100).toFixed(2);
  //     setTotalRevenue(`£${totalInGBP}`);
  //   };

  //   fetchRevenue();
  // }, [dateFilter['Total Revenue']]);

  const dash_array = [
    {
      title: 'Total Revenue',
      svg_image: 'cash.svg',
      description: metrics.totalRevenue || 'Loading...',
    },
    {
      title: 'Total Orders',
      svg_image: 'cart_dash.svg',
      description: metrics.totalOrders || 'Loading...',
    },
    {
      title: 'Total Customers',
      svg_image: 'customers.svg',
      description: metrics.totalCustomers || 'Loading...',
    },
    {
      title: 'Pending Delivery',
      svg_image: 'truck.svg',
      description: metrics.pendingDelivery || 'Loading...',
    }
  ]

  return (
    <div className="admin-section">
      <div className="admin-section-dashboard-container">


        {/* FIRST ROW */}

        <div className='dashboard-nav'>
          <div className='one'>
            <h2>Overview</h2>
          </div>

          <div className='two'>
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <Image src={supabse_image_path("search.svg")} width={20} height={20} alt="search-icon" className='search-icon' />
            </div>
          </div>

          <div className="dashboard-icons">
            <div className="dashboard-date">
              <Image src={supabse_image_path("calendar.svg")} width={20} height={20} alt='notifications' />
              <p>30 May</p>
            </div>
            <div className="dashboard-notification">
              <Image src={supabse_image_path("bell.svg")} width={20} height={20} alt='notifications-svg' />
              <div className="red-dot"></div>
            </div>
          </div>
        </div>

        {/* SECOND ROW */}

        <div className='dashboard-cards'>
          {
            dash_array.map((item, index) => (
              <Admin_dashboard_cards
                key={index}
                title={item.title}
                svg_image={item.svg_image}
                description={item.description}
                setDateFilter={setDateFilter}
                metrics={metrics}
              />
            ))
          }
        </div>

        <div></div>
        <div></div>
      </div>
    </div>
  );
}
