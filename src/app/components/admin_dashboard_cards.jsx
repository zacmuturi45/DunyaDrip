'use client'
import supabse_image_path from '@/utils/supabase/supabse_image_path'
import Image from 'next/image'
import React, { useState } from 'react'
import { filterOptions } from '../../../public/imports'


export default function Admin_dashboard_cards({ title, svg_image, description, setDateFilter, metrics }) {
  const [selectedFilter, setSelectedFilter] = useState('Last 30 days')
  const [showDropdown, setShowDropdown] = useState(false)
  const today = new Date()
  const last30Days = new Date()
  const metricsMap = {
    'Total Revenue': metrics.totalRevenue,
    'Total Orders': metrics.totalOrders,
    'Total Customers': metrics.totalCustomers,
    'Pending Delivery': metrics.pendingDelivery,
  };

  last30Days.setDate(today.getDate() - 30)

  const last3Months = new Date()
  last3Months.setMonth(today.getMonth() - 3)

  const last6Months = new Date()
  last6Months.setMonth(today.getMonth() - 6)

  const handleSelect = (option, title) => {
    setSelectedFilter(option)

    switch(option) {
      case 'Last 30 days':
        setDateFilter(prev => ({ ...prev, [title]: last30Days }))
        break;
      case 'Last 3 months':
        setDateFilter(prev => ({ ...prev, [title]: last3Months }))
        break;
      case 'Last 6 months':
        setDateFilter(prev => ({ ...prev, [title]: last6Months }))
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
            <p>{selectedFilter}</p>
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
        <div className='one'>{metricsMap[title]}</div>
        <div className='two'>
          <Image src={supabse_image_path("chartdown.svg")} width={15} height={15} alt='' />
          <p>11%</p>
        </div>
      </div>
    </div>
  )
}
