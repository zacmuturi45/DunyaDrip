"use client"

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import SuccessCard from '../components/success_card';
import Link from 'next/link';
import { FlagContext } from '../contexts/flagcontext';
import { supabase_client } from '@/utils/supabase/clint';
import supabse_image_path from '@/utils/supabase/supabse_image_path';
import { useAuth } from '../contexts/auth_context';
import Spinner from '../components/spinner';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionData, setSessionData] = useState(null);
  const { location } = useContext(FlagContext)
  const router = useRouter();
  const [vat_value, setVatValue] = useState(0);
  const supabase = supabase_client();
  const { user } = useAuth();


  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch(`/api/checkout-sessions/${sessionId}`);
      const data = await res.json();
      setSessionData(data);
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionData) {
      const VAT_RATE = 0.2;
      const vat = ((sessionData.total/100) - sessionData.shippingOption.price) / (1 + VAT_RATE) * VAT_RATE;
      setVatValue(vat);
    }
  }, [sessionData]);

  useEffect(() => {
    const saveOrder = async () => {
      const { error } = await supabase.from('client_orders').insert({
        customer_email: sessionData.customer_email,
        items: sessionData.items,
        total: sessionData.total,
        vat: Math.round(vat_value), // already in cents
        payment_method: sessionData.payment_method.brand.toUpperCase(),
        last_four: sessionData.payment_method.last4,
        created_at: new Date(sessionData.created * 1000).toISOString()
      });

      if(error) {
        console.error('Error saving order:', error.message);
      }
    };

    if (sessionData && vat_value) {
      saveOrder();
    }
  }, [sessionData, vat_value]);

  if (!sessionData) return <p>Loading...</p>;

  return (
    <div className='success-page'>
      <div className="success-container">
        <div className='success_one'>
          <div className="green_tick">
            <div className='green_one'>
              <Image src={supabse_image_path('/greentick.svg')} width={70} height={70} alt='green_check' className='greentick-circle' />
            </div>
          </div>
          <div className="success_one_detail">
            <p>Thank you for your Purchase!</p>
            <p>The order confirmation has been sent to <span>{user ? `${sessionData.customer_email}` : 'your email'}</span></p>
          </div>
        </div>

        <div className='success_detail'>
          {
            sessionData.items ? (
              <div className='success_card_div'>
                {sessionData.items.map((item, index) => (
                  <SuccessCard cart_item_price={`£${(item.amount / 100).toFixed(2)}`} cart_item_quantity={item.quantity} cart_item_size={item.size} cart_item_title={item.name} key={index} identifier={index} />
                ))}
              </div>
              // <ul>
              //   {items.map((item, index) => (
              //     <li key={index}>
              //       {`Quantity: ${item.quantity}`} {item.name} - Size: {item.size}
              //     </li>
              //   ))}
              // </ul>
            ) : (
              <p>Loading your order...</p>
            )
          }
          <div className="totals">
            <p>Transaction Date: <span>{new Date(sessionData.created * 1000).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })}</span></p>
            <p>Payment Method: <span>{sessionData.payment_method.brand.toUpperCase()} ending with **{sessionData.payment_method.last4.slice(0, 3)}</span></p>
            <p>SubTotal: <span>{((sessionData.total / 100).toFixed(2) - (sessionData.shippingOption.price + vat_value))}</span></p>
            <p>VAT: <span>£{vat_value}</span></p>
            <p>Shipping: <span>{sessionData.shippingOption.price}</span></p>
            <div className="total_price">
              <p>Total <span>£{sessionData.total/100}</span></p>
              <Link href={"/drip"} style={{ alignSelf: "center" }}>
                <button onClick={() => router.push('/drip')}>Continue Shopping</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
