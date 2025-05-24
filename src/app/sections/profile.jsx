"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/auth_context";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const { display_name, setShowNav, last_name, user_email } = useAuth(); 
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
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
      router.refresh()
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

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirm) return;

    setLoading(true);
    const toastId = toast.loading("Deleting account...");

    try {
      const res = await fetch("/api/delete-account", {
        method: "DELETE",
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to delete account");
      }

      toast.success("Account deleted successfully", { id: toastId });
      setShowNav(false);
      setLoading(false);
      router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <div className="page">
      <div className="template-one">
      <h2>{`Hello, ${display_name}`}</h2>
      {/* <button onClick={() => {
        setShowNav(false)
        router.push("/")
      }}>Home</button> */}
      {/* <p>You don&apos;t currently have any orders.</p>
      <p>Once you have checked out, you can view and track your order here.</p> */}
      <button onClick={handleSignOut} disabled={loading}>
        {loading ? "Logging out..." : "Log Out"}
      </button>
      <button onClick={handleDeleteAccount} disabled={loading}>
        {loading ? "Deleting..." : "Delete Account"}
      </button>
      </div>

      <div className="templates">
        <div className="temp-title">
          <h4>Orders(0)</h4>
          <h4 onClick={() => router.push("/drip")}>Shop Now</h4>
        </div>
        <div className="temp-text">
          <p>You do not have any orders for now.</p>
          <p>All your orders will be displayed here.</p>
        </div>
      </div>

      <div className="templates">
        <div className="temp-title">
          <h4>Addresses</h4>
          <h4>Add your Address</h4>
        </div>
        <div className="temp-text">
          <p>Your shipping addresses will appear here.</p>
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
          <h4>Add Credit Card</h4>
        </div>
        <div className="temp-text">
          <p>For faster checkouts, add credit card.</p>
        </div>
      </div>


    </div>
  );
}
