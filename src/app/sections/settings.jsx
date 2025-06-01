'use client'

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/auth_context";

export default function Settings() {
    const [loading, setLoading] = useState(false);
    const { setShowNav } = useAuth();

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
            <h2>Settings</h2>
            <p>Change your account settings</p>
            <button onClick={handleDeleteAccount} disabled={loading}>
                {loading ? "Deleting..." : "Delete Account"}
            </button>
        </div>
    );
}
