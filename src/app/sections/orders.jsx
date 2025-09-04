// components/pages/Orders.jsx
"use client"

import { useContext, useEffect, useState } from "react";
import SectionLoader from "../components/section_loader";
import { useOrders } from "../contexts/my_orders_context";
import SuccessCard from "../components/success_card";
import { FlagContext } from "../contexts/flagcontext";
import Image from "next/image";
import supabse_image_path from "@/utils/supabase/supabse_image_path";
import { groupOrdersByMonth } from "../../../public/imports";
import OrdersCard from "../components/orders_card";

export default function Orders() {
  const { orders, loading } = useOrders();
  const [expanded, setExpanded] = useState(null)
  const [shipping_option, setShippingOption] = useState({});
  const [order_status, setOrderStatus] = useState(null);
  const [order_created_at, setOrderCreatedAt] = useState("")


  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    }
  }, [expanded]);

  if (loading) return <SectionLoader />

  const grouped = groupOrdersByMonth(orders)

  return (
    <div>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="ordersPage">
          <h2>Order History</h2>
          <div className="table_container">
            {Object.entries(grouped).map(([monthYear, orders]) => (
              <div key={monthYear} style={{ marginBottom: "2rem" }} className="month-group">
                <h2>{monthYear}</h2>
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Order Date</th>
                      <th>Status</th>
                      <th>Item Count</th>
                      <th>Total</th>
                      <th>-</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{`${(order.id).slice(0, 5)}...`}</td>
                        <td>{new Date(order.created_at).toLocaleDateString('default', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}</td>
                        <td>{order.status}</td>
                        <td>{order.products.length}</td>
                        <td>£{(order.total / 100).toFixed(2)}</td>
                        <td id="detail_button"><span onClick={() => {
                          setExpanded(order.id)
                          setOrderStatus(order.delivery_status)
                          setShippingOption(order.shipping_option)
                          setOrderCreatedAt(order.created_at)
                        }}>Details</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {
            expanded && (
              <div className="orderDetails">
                <div className="x_button" onClick={() => setExpanded(null)}>
                  <Image src={supabse_image_path('/x.svg')} width={100} height={100} alt="x-svg" />
                </div>

                <div className="order_details_container">
                  <div className="order_details_cards">
                    <div className="title">
                      <div className="div_one">
                        <p className="p_one">Order: <span>{expanded}</span></p>
                        <p>{`Order placed on ${new Date(
                          orders.find((o) => o.id === expanded).created_at
                        ).toLocaleDateString('default', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}`}</p>

                      </div>
                      <div className="div_two">
                        <p>Tracking No:<span>583799723799272</span></p>
                      </div>
                    </div>

                    <div className="cards">
                      {
                        orders.find((o) => o.id === expanded).products.map((item, index) => (
                          <OrdersCard cart_item_price={`£ ${(item.amount / 100).toFixed(2)}`} cart_item_quantity={item.quantity} cart_item_size={item.size} cart_item_title={item.name} key={index} identifier={index} image={item.image} delivery_status={order_status} shippingOption={shipping_option} createdAt={order_created_at} />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}


