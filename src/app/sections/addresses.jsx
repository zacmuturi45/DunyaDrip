"use client"

import React, { useEffect, useState } from 'react';
import { countries, countryCodes } from '../../../public/imports';
import { useAuth } from '../contexts/auth_context';
import { supabase_client } from '@/utils/supabase/clint';
import { toast } from 'react-hot-toast';

export default function AddressForm() {
  const { user } = useAuth();
  const supabase = supabase_client();
  const [allAddresses, setAllAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    countryCode: '+254',
    phone: '',
    address1: '',
    apartment: '',
    address2: '',
    city: '',
    postalCode: '',
    country: '',
    preferred: false,
  });

  const [savedAddress, setSavedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const deconstructAddress = (address) => ({
    fullName: address.full_name || '',
    countryCode: address.phone?.slice(0, 4) || '+254',
    phone: address.phone?.slice(4) || '',
    address1: address.address1 || '',
    apartment: address.apartment_suite || '',
    address2: address.address2 || '',
    city: address.city || '',
    postalCode: address.postal_code || '',
    country: address.country || '',
    preferred: address.preferred || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  useEffect(() => {
    if (!user) return;
    console.log(`About to fetch addresses for ${user}`)
    const fetchAddresses = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id);


      if (error) {
        console.error("Fetch Address Error:", error.message);
      } else {
        setAllAddresses(data);
        if (data.length > 0) {
          setSavedAddress(data[0]);
          setForm(deconstructAddress(data[0]));
        }
      }
    };

    fetchAddresses();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!user) {
      toast.error("You must be logged in to save an address.");
      return;
    }

    const payload = {
      user_id: user.id,
      full_name: form.fullName,
      phone: form.countryCode + form.phone,
      apartment_suite: form.apartment,
      address1: form.address1,
      address2: form.address2,
      city: form.city,
      postal_code: form.postalCode,
      country: form.country,
      preferred: form.preferred,
    };

    let result;
    if (editingId) {
      result = await supabase.from("addresses").update(payload).eq("id", editingId);
    } else {
      result = await supabase.from("addresses").insert([payload]);
    }

    const { error } = result;
    if (error) {
      console.error("Save error:", error.message);
      toast.error("Failed to save address.");
    } else {
      toast.success(editingId ? "Address updated!" : "Address saved!");
      setLoading(false);
      setEditingId(null);
      setIsEditing(false);
      // Refresh list
      const { data } = await supabase.from("addresses").select("*").eq("user_id", user.id);
      setAllAddresses(data);
      setSavedAddress(data[0]);
    }
  };

  const deleteAddress = async (id) => {
    setDeleting(true)
    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error.message);
      toast.error("Failed to delete address.");
    } else {
      toast.success("Address deleted successfully!");
      setDeleting(false);
      setAllAddresses((prev) => prev.filter((addr) => addr.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setIsEditing(false);
        setForm({
          fullName: '',
          countryCode: '+254',
          phone: '',
          address1: '',
          apartment: '',
          address2: '',
          city: '',
          postalCode: '',
          country: '',
          preferred: false,
        });
      }
    }
  };



  const handleAddNew = () => {
    setForm({
      fullName: '',
      countryCode: '+254',
      phone: '',
      address1: '',
      apartment: '',
      address2: '',
      city: '',
      postalCode: '',
      country: '',
      preferred: false,
    });
    setSavedAddress(null);
    setIsEditing(true);
  };

  if (allAddresses.length > 0 && !isEditing) {
    return (
      <div className="addressList">
        <h2>My Addresses</h2>
        <button onClick={handleAddNew} id='add_new_address_button'>Add New Address</button>

        {allAddresses.map((addr) => (
          <div key={addr.id} className="addressSummary">
            <p><strong>Name:</strong> {addr.full_name}</p>
            <p><strong>Phone:</strong> {addr.phone}</p>
            <p><strong>City:</strong> {addr.city}</p>
            <p><strong>Preferred:</strong> {addr.preferred ? "Yes" : "No"}</p>
            <p><strong>Address1:</strong>{addr.address1}</p>
            <p><strong>Address2</strong>{addr.address2}</p>
            <p><strong>Country</strong>{addr.country}</p>
            <p><strong>Apartment</strong>{addr.apartment_suite}</p>


            <div className="buttons">
              <button onClick={() => {
                setForm(deconstructAddress(addr));
                setIsEditing(true);
                setEditingId(addr.id);
              }}>Edit</button>
              <button onClick={() => deleteAddress(addr.id)} style={{ color: "red" }}>
                { deleting ? "Deleting..." : "Delete" }
              </button>
            </div>
          </div>
        ))}

      </div>
    )
  }


  return (
    <form className="addressForm" onSubmit={handleSubmit}>
      <h2>Shipping Address</h2>

      <input name="fullName" type="text" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
      <select name="country" value={form.country} onChange={handleChange} required>
        {countries.map((c, index) => (
          <option key={index} value={c.country_value}>
            {c.country_value}
          </option>
        ))}
      </select>

      <div className="phoneGroup">
        <select name="countryCode" onChange={handleChange} value={form.countryCode} required>
          {countryCodes.map(({ code, country }) => (
            <option key={`country_code_address_${country}`} value={code}>
              ({country}) ({code})
            </option>
          ))}
        </select>
        <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
      </div>

      <input name="address1" type="text" placeholder="Address Line 1" value={form.address1} onChange={handleChange} required />
      <input name="apartment" type="text" placeholder="Apartment, suite, etc. (optional)" value={form.apartment} onChange={handleChange} />
      <input name="address2" type="text" placeholder="Address Line 2" value={form.address2} onChange={handleChange} />
      <input name="city" type="text" placeholder="City" value={form.city} onChange={handleChange} required />
      <input name="postalCode" type="text" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} required />

      <label className="checkboxLabel">
        <input type="checkbox" name="preferred" checked={form.preferred} onChange={handleChange} id='checkbox-check' />
        Set as your preferred shipping address
      </label>


      <button type="submit">{ loading ? "Please wait..." : "Save Address" }</button>
    </form>
  );
}
