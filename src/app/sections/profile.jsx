"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/auth_context";
import { useState } from "react";
import toast from "react-hot-toast";
import { useOrders } from "../contexts/my_orders_context";
import Cookies from "js-cookie";
import { useCart } from "../contexts/cart_context";

export default function Profile() {
  const { display_name, setShowNav, last_name, user_email, setActiveSection } = useAuth(); 
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const { orders }  = useOrders();
  const { setCart } = useCart();

  const handleSignOut = async () => {
    setCart([]);
    Cookies.remove('cart');
    setLoading(true)
    const toastId = toast.loading('Logging out...')

    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      toast.success('Logged out successfully', { id: toastId })
      router.push('/')
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      toast.error(error.message, { id: toastId })
    } finally {
      setShowNav(false)
      setLoading(false)
    }
  }


  return (
    <div className="page">
      <div className="template-one">
      <h2>{`Hello ${display_name === undefined ? "" : display_name}`}</h2>
      {/* <button onClick={() => {
        setShowNav(false)
        router.push("/")
      }}>Home</button> */}
      {/* <p>You don&apos;t currently have any orders.</p>
      <p>Once you have checked out, you can view and track your order here.</p> */}
      <button onClick={handleSignOut} disabled={loading}>
        {loading ? "Logging out..." : "Log Out"}
      </button>
      </div>

      <div className="templates">
        <div className="temp-title">
          <h4>{`Orders (${orders.length})`}</h4>
          <h4 onClick={() => setActiveSection('orders')}>My Orders</h4>
        </div>
        <div className="temp-text">
          {
            orders.length > 0 ? (<p>
              {`You have ${orders.length} orders.`}
            </p>) : (
              <>
              <p>You do not have any orders for now.</p>
          <p>All your orders will be displayed here.</p>
              </>
            )
          }
        </div>
      </div>

      <div className="templates">
        <div className="temp-title">
          <h4>Addresses</h4>
          <h4 onClick={() => setActiveSection('addresses')}>My Addresses</h4>
        </div>
        <div className="temp-text">
          <p>Check out faster with a personal Address.</p>
        </div>
      </div>

      <div className="templates">
        <div className="temp-title">
          <h4>Personal Information</h4>
          <h4>Edit Profile</h4>
        </div>
        <div className="temp-text" id="profile-template">
          <p>First Name: <span>{display_name}</span></p>
          <p>Last Name: <span>{last_name}</span></p>
          <p>Email: <span>{user_email}</span></p>
        </div>
      </div>

      <div className="templates">
        <div className="temp-title">
          <h4>Payments</h4>
          <h4>Payment History</h4>
        </div>
        <div className="temp-text">
          <p>See payment history.</p>
        </div>
      </div>


    </div>
  );
}
