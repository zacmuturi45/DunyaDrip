// components/pages/Orders.jsx
"use client"

import { supabase_client } from "@/utils/supabase/clint";
import { useAuth } from "../contexts/auth_context";
import { useEffect, useState } from "react";

export default function Orders() {
  const { user_email } = useAuth();
  const supabase = supabase_client();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('client_orders')
        .select('*')
        .eq('customer_email', user_email);

      if (error) console.error(error);
      else setOrders(data);

      setLoading(false);
    };
    fetchOrders();
  }, [])

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  if (loading) return <p>Loading orders...</p>

  return (
    <div>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          <div className="ordersPage">
            <h2>My Orders</h2>
            <table className="ordersTable">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Email</th>
                  <th>Item Count</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const date = new Date(order.created_at * 1000).toLocaleDateString("en-GB");
                  return (
                    <tr key={order.id}>
                      <td>{order.id.slice(0, 6)}...</td>
                      <td>{order.customer_email}</td>
                      <td>{order.items.length}</td>
                      <td>{(order.total / 100).toFixed(2)}</td>
                      <td>{date}</td>
                      <td>
                        <button onClick={() => toggleExpand(order.id)}>
                          {expanded === order.id ? "Hide" : "Details"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {expanded && (
              <div className="ordersDetails">
                <h3>Order Details</h3>
                <ul>
                  {orders
                    .find((o) => o.id === expanded)
                    .items.map((item, index) => (
                      <li key={index}>
                        <strong>{item.name}</strong> - Size: {item.size}, Qty: {item.quantity}, Price: £
                        {(item.amount / 100).toFixed(2)}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
