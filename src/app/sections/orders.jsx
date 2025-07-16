// components/pages/Orders.jsx
"use client"

import { useContext, useState } from "react";
import SectionLoader from "../components/section_loader";
import { useOrders } from "../contexts/my_orders_context";
import SuccessCard from "../components/success_card";
import { FlagContext } from "../contexts/flagcontext";

export default function Orders() {
  const { orders, loading } = useOrders();
  const [expanded, setExpanded] = useState(null)
  const { location } = useContext(FlagContext);


  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  if (loading) return <SectionLoader />

  return (
    <div>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          <div className="ordersPage">
            <h2>My Orders</h2>
            <div className="table_container">
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
                    const date = new Date(order.created_at).toLocaleDateString("en-GB");
                    return (
                      <tr key={order.id}>
                        <td>{order.id.slice(0, 6)}...</td>
                        <td>{order.customer_email}</td>
                        <td>{order.products.length}</td>
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
            </div>

            {expanded && (
              <div className="orderDetails">
                <h3>Order Details</h3>
                <div className="order_detail_card">
                  {orders
                    .find((o) => o.id === expanded)
                    .products.map((item, index) => (
                      <SuccessCard cart_item_price={`£ ${(item.amount / 100).toFixed(2)}`} cart_item_quantity={item.quantity} cart_item_size={item.size} cart_item_title={item.name} key={index} identifier={index} image={item.image} />
                    ))}
                </div>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
