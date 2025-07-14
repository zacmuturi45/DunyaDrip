"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth_context";
import toast from "react-hot-toast";
import SectionLoader from "../components/section_loader";
import { supabase_client } from "@/utils/supabase/clint";

export default function EditProfileForm() {
  const supabase = supabase_client;
  const [profile, setProfile] = useState({ first_name: "", last_name: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("unique_identifier", user.id)
          .single();
        if (error) {
          toast.error("Could not fetch profile.");
        }
        if (data) setProfile(data);
      } catch (err) {
        toast.error("An error occurred while fetching profile.");
      }
      setLoading(false);
    };
    if (user?.id) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("unique_identifier", user.id);
      if (error) {
        toast.error("Failed to save profile.");
      } else {
        toast.success("Profile updated successfully!");
        // window.location.reload();
      }
    } catch (err) {
      toast.error("An error occurred while saving profile.");
    }
    setSaving(false);
  };

  if (loading) return <SectionLoader />

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <div className="profile-form__group">
        <label htmlFor="first_name">First Name</label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          value={profile.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="profile-form__group">
        <label htmlFor="last_name">Last Name</label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          value={profile.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}