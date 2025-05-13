"use client"

import React from 'react'
import { supabase } from '../(auth)/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error Logging out:', error.message);
    } else {
      console.log("User Logged out")
    }
  }
  return (
    <div className='dashboard_main'>
      <button onClick={() => {
        handleLogout()
        setTimeout(() => {
          router.push("/login")
        }, 1500);
      }}>Logout</button>
    </div>
  )
}
