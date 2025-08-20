'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import supabse_image_path from '@/utils/supabase/supabse_image_path';
import Admin_dashboard_cards from '../admin_dashboard_cards';
import { createClient } from '@/utils/supabase/client';
import { filterOptions, localTime, topSellingProducts } from '../../../../public/imports';
import OneAnalytics from '../one_analytics_tab';
import SalesChart from '../sales_chart';
import dayjs from 'dayjs';
import Spinner from '../spinner';

export default function DashboardHome() {
  const today = new Date();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Last 30 days');
  const [filterSales, setFilterSales] = useState('Last 30 days');
  const [salesData, setSalesData] = useState([]);
  const last30Days = new Date();
  const { date_now } = localTime()
  const supabase = createClient;
  last30Days.setDate(today.getDate() - 30);

  // --- SEARCH ---
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  // --- TRIGGER SEARCH ON CHANGE (debounced) ---
  useEffect(() => {
    const q = searchQuery.trim();

    if (q === '') {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);

    const timer = setTimeout(async () => {
      try {
        const [profilesRes, productsRes] = await Promise.all([
          supabase
            .from('profiles')
            .select('id, first_name, last_name, created_at')
            .or(`first_name.ilike.%${q}%,last_name.ilike.%${q}%`),

          supabase
            .from('all_products')
            .select('id, created_at, name, description, price, category, product_type, size, season, color, niche, image_url, image_url2, image_url3, image_url4')
            .or(`name.ilike.%${q}%,description.ilike.%${q}%`),
        ]);

        if (profilesRes.error) throw profilesRes.error;
        if (productsRes.error) throw productsRes.error;

        const merged = [
          ...(profilesRes.data ?? []).map(p => ({ ...p, type: 'user' })),
          ...(productsRes.data ?? []).map(p => ({ ...p, type: 'product' })),
        ];

        setSearchResults(merged);
      } catch (err) {
        console.error('Search error:', err.message || err);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, supabase]);

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setSearchQuery('');
    setSearchResults([]);
  };

  // ---- METRICS / SALES ----
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
    const fetchSalesData = async () => {
      let fromDate = dayjs().subtract(30, 'day').toISOString();

      if (filterSales === 'Last 7 days') {
        fromDate = dayjs().subtract(7, 'day').toISOString();
      } else if (filterSales === 'Last 6 months') {
        fromDate = dayjs().subtract(6, 'month').toISOString();
      } else if (filterSales === 'Last 12 months') {
        fromDate = dayjs().subtract(12, 'month').toISOString();
      }

      const { data, error } = await supabase
        .from('client_orders')
        .select('created_at, total')
        .gte('created_at', fromDate)
        .not('total', 'is', null)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching sales data:', error.message);
      } else {
        setSalesData(data || []);
      }
    };
    fetchSalesData();
  }, [filterSales, supabase]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          { count: totalOrders },
          { count: totalCustomers },
          { count: pendingDelivery },
          { data: revenueData, error: revenueError },
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

        const totalCents = (revenueData ?? []).reduce((sum, order) => sum + (order.total || 0), 0);
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
    dateFilter['Pending Delivery'],
    supabase,
  ]);

  const aggregatedData = salesData.reduce((acc, order) => {
    const month = dayjs(order.created_at).format('YYYY-MM');
    acc[month] = (acc[month] || 0) + order.total;
    return acc;
  }, {});

  const chartData =
    Object.entries(aggregatedData).map(([date, total]) => ({ date, total })) || [];

  const handleSelect = (option) => {
    setSelectedFilter(option);
    setShowDropdown(false);
  };

  const dash_array = [
    { title: 'Total Revenue', svg_image: 'cash.svg', description: metrics.totalRevenue || 'Loading...' },
    { title: 'Total Orders', svg_image: 'cart_dash.svg', description: metrics.totalOrders || 'Loading...' },
    { title: 'Total Customers', svg_image: 'customers.svg', description: metrics.totalCustomers || 'Loading...' },
    { title: 'Pending Delivery', svg_image: 'truck.svg', description: metrics.pendingDelivery || 'Loading...' },
  ];

  const showDashboard = !selectedResult && searchQuery.trim() === '';

  return (
    <div className="admin-section">
      <div className="admin-section-dashboard-container">
        {/* NAV + SEARCH */}
        <div className='dashboard-nav'>
          <div className='one'><h2>Overview</h2></div>

          <div className='two'>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search users or products..."
                value={searchQuery}
                onChange={(e) => {
                  setSelectedResult(null);
                  setSearchQuery(e.target.value);
                }}
              />
              <Image src={supabse_image_path("search.svg")} width={20} height={20} alt="search-icon" className='search-icon' />
            </div>

            {/* DETAILED VIEW */}
            {selectedResult && (
              <div className="detailed-result">
                {selectedResult.type === 'user' ? (
                  <div className='product-details-container'>
                    <div className="image-container">
                      <Image src={supabse_image_path("placeholder.jpg")} width={100} height={100} className='img' alt='img' />
                    </div>
                    <div className="details-container">
                      <h3>{selectedResult.first_name} {selectedResult.last_name}</h3>
                      <p>ID: {selectedResult.id}</p>
                      <p>Registered on: {dayjs(selectedResult.created_at).format('DD MMM YYYY')}</p>
                      <button className="btn" onClick={() => setSelectedResult(null)}>Back to dashboard</button>
                    </div>
                  </div>
                ) : (
                  <div className='product-details-container'>
                    <div className="image-container">
                      {selectedResult?.image_url && (
                        <Image
                          src={supabse_image_path(selectedResult.image_url)}
                          width={160}
                          height={160}
                          alt={selectedResult?.name || "image"}
                          className='img'
                        />
                      )}
                    </div>
                    <div className="details-container">
                      <h3>{selectedResult.name}</h3>
                      <p>£{(selectedResult.price / 100).toFixed(2)}</p>
                      <p>{selectedResult.description}</p>
                      <button className="btn" onClick={() => setSelectedResult(null)}>Back to dashboard</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SEARCH RESULTS */}
            {!selectedResult && searchQuery.trim() !== '' && (
              <div className="search-results-container">
                <div className="cards-container">
                  {searchLoading ? (
                    <div className="search-results-admin" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                      <Spinner />
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="search-no-results" style={{ textAlign: 'center', width: '100%', position: 'absolute', top: '200%', fontFamily: "Inter", fontSize: "1.2rem" }}>
                      <span>No results found.</span>
                    </div>
                  ) : (
                    <div className="search-results-admin">
                      {searchResults.map((item, index) => (
                        <div
                          key={`${item.type}-${item.id}-${index}`}
                          className="search-result"
                          onClick={() => handleResultClick(item)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && handleResultClick(item)}
                          style={{ cursor: 'pointer' }}
                        >
                          {item.type === 'user' ? (
                            <div className='user-results'>
                              <div className="profile_pic">
                                <Image src={supabse_image_path("placeholder.jpg")} width={100} height={100} className='img' alt='img' />
                              </div>
                              <p>{item.first_name} {item.last_name}</p>
                            </div>
                          ) : (
                            <div className='user-results'>
                              <div className="profile_pic">
                                {item?.image_url && (
                                  <Image
                                    src={supabse_image_path(item.image_url)}
                                    width={160}
                                    height={160}
                                    alt={item?.name || "image"}
                                    className='img'
                                  />
                                )}
                              </div>
                              <p>{item.name} — £{(item.price / 100).toFixed(2)}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="dashboard-icons">
            <div className="dashboard-date">
              <Image src={supabse_image_path("calendar.svg")} width={20} height={20} alt='notifications' />
              <p style={{fontFamily: "Inter"}}>{ date_now }</p>
            </div>
            <div className="dashboard-notification">
              <Image src={supabse_image_path("bell.svg")} width={20} height={20} alt='notifications-svg' />
              <div className="red-dot"></div>
            </div>
          </div>
        </div>

        {/* DASHBOARD */}
        {showDashboard && (
          <>
            <div className='dashboard-cards'>
              {dash_array.map((item, index) => (
                <Admin_dashboard_cards
                  key={index}
                  title={item.title}
                  svg_image={item.svg_image}
                  description={item.description}
                  setDateFilter={setDateFilter}
                  metrics={metrics}
                />
              ))}
            </div>

            <div className='sales_analytics'>
              <div className='one'>
                <div className="one_container">
                  <div className='one_title'>
                    <h2 style={{ fontFamily: "Inter", fontWeight: 700, color: "rgb(48, 48, 48)", fontSize: "1.5rem" }}>Sales Analytics</h2>
                    <div className="sort_tab" style={{ display: "flex", alignItems: "center" }}>
                      <p style={{ color: "gray", fontFamily: "Inter", fontSize: ".9rem", marginRight: ".5rem", fontWeight: 500 }}>Sort by</p>
                      <div className='arrow' id='arrow_tab' onClick={() => setShowDropdown(!showDropdown)} style={{ border: "1px solid rgba(216, 216, 216, 1)", padding: "3px 10px", borderRadius: "2px", minWidth: "150px" }}>
                        <Image src={supabse_image_path("calendar.svg")} width={15} height={15} alt='calendar_svg' className='calendar_svg' style={{ marginRight: "5px" }} />
                        <p style={{ fontWeight: 500 }}>{selectedFilter}</p>
                        <Image
                          src={supabse_image_path("arrow.svg")}
                          width={15} height={15}
                          alt='arrow down'
                          className={`arrow_img ${showDropdown ? 'rotate' : ''}`}
                        />
                        {showDropdown && (
                          <div className="dropdown">
                            {filterOptions.map(option => (
                              <div
                                key={option}
                                className="dropdown_item"
                                onClick={() => handleSelect(option)}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className='one_analytics'>
                    <OneAnalytics title={"Income"} value={"24,000"} percentage={"-0.34%"} icon={"tipblue.svg"} />
                    <div className="middle_child">
                      <OneAnalytics title={"Expenses"} value={"4,000"} percentage={"-0.32%"} icon={"tiporange.svg"} />
                    </div>
                    <OneAnalytics title={"Balance"} value={"20,000"} percentage={"-0.22%"} icon={"tipgreen.svg"} />
                  </div>

                  <div className="top_selling">
                    <h3 className="top_selling_title">Top Selling Products</h3>
                    <div className="carousel">
                      {topSellingProducts.map((product, index) => (
                        <div className="product_card" key={index}>
                          <div className="product_image">
                            <Image src={product.image} width={100} height={100} alt={product.name} />
                          </div>
                          <div className="product_info">
                            <p className="product_name">{product.name}</p>
                            <p className="product_sold">{product.sold} pcs sold</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              <div className='chart_div'>
                <SalesChart data={chartData} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
