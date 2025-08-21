'use client'
import supabse_image_path from '@/utils/supabase/supabse_image_path'
import Image from 'next/image'
import React, { useState } from 'react'
import { filterOptions } from '../../../public/imports'


export default function Admin_dashboard_cards({
  title,
  svg_image,
  description,
  setDateFilter,
  metrics,
  sales_data,
  setFilterSales,
  globalCardFilter,
  setGlobalCardFilter,
}) {
  const [selectedFilter, setSelectedFilter] = useState('Last 30 days')
  const [showDropdown, setShowDropdown] = useState(false)
  const today = new Date()
  const last30Days = new Date()
  const metricsMap = {
    'Total Revenue': metrics.totalRevenue,
    'Total Orders': metrics.totalOrders,
    'Total Customers': metrics.totalCustomers,
    'Pending Deliveries': metrics.pendingDelivery,
  };

  const metricsComparisonMap = {
    'Total Revenue': sales_data.revenue,
    'Total Orders': sales_data.orders,
    'Total Customers': sales_data.customers,
    'Pending Deliveries': sales_data.pendingDeliveries,
  }

  last30Days.setDate(today.getDate() - 30)

  const last7Days = new Date()
  last7Days.setDate(today.getDate() - 7)

  const last3Months = new Date()
  last3Months.setMonth(today.getMonth() - 3)

  const last6Months = new Date()
  last6Months.setMonth(today.getMonth() - 6)

  const last12Months = new Date()
  last12Months.setMonth(today.getMonth() - 12)

  const handleSelect = (option, title) => {
    setGlobalCardFilter(option)

    switch (option) {
      case 'Last 7 days':
        setDateFilter(prev => ({ ...prev, [title]: last7Days }))
        setFilterSales('Last 7 days')
        break;
      case 'Last 30 days':
        setDateFilter(prev => ({ ...prev, [title]: last30Days }))
        setFilterSales('Last 30 days')
        break;
      case 'Last 3 months':
        setDateFilter(prev => ({ ...prev, [title]: last3Months }))
        setFilterSales('Last 3 months')
        break;
      case 'Last 6 months':
        setDateFilter(prev => ({ ...prev, [title]: last6Months }))
        setFilterSales('Last 6 months')
        break;
      case 'Last 12 months':
        setDateFilter(prev => ({ ...prev, [title]: last12Months }))
        setFilterSales('Last 12 months')
        break;
      default:
        setDateFilter(prev => ({ ...prev, [title]: last30Days }))
    }

    setShowDropdown(false)
    // You can trigger a data fetch here if needed
  }


  return (
    <div className='admin_dashboard_card'>
      <div className='admin_dashboard_card_header'>
        <div className='admin_dashboard_card_header_title'>
          <h4>{title}</h4>
          <div className='arrow' onClick={() => setShowDropdown(!showDropdown)}>
            <p>{globalCardFilter}</p>
            <Image
              src={supabse_image_path("arrow.svg")}
              width={15}
              height={15}
              alt='arrow down'
              className={`arrow_img ${showDropdown ? 'rotate' : ''}`}
            />
            {showDropdown && (
              <div className="dropdown">
                {filterOptions.map(option => (
                  <div
                    key={option}
                    className="dropdown_item"
                    onClick={() => handleSelect(option, title)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='admin_dashboard_card_header_image'>
          <Image src={supabse_image_path(svg_image)} width={30} height={30} alt='illustration' />
        </div>
      </div>

      <div className='admin_dashboard_card_body'>
        <div className='one'>{metricsComparisonMap[title].currentValue}</div>
        <div className='two'>
          <Image src={metricsComparisonMap[title].isRising ? supabse_image_path("chart-up.svg") : supabse_image_path("chartdown.svg")} width={15} height={15} alt='' />
          <p style={metricsComparisonMap[title].isRising ? { color: "green" } : { color: "red" }}>{`${metricsComparisonMap[title].percentageChange}%`}</p>
        </div>
      </div>
    </div>
  )
}
