"use client"

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import SuccessCard from '../components/success_card';
import Link from 'next/link';
import { FlagContext } from '../contexts/flagcontext';
import { useAuth } from '../contexts/auth_context';
import supabse_image_path from '@/utils/supabase/supabse_image_path';
import Spinner from '../components/spinner';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionData, setSessionData] = useState(null);
  const { location } = useContext(FlagContext)
  const router = useRouter();
  const [vat_value, setVatValue] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch(`/api/checkout-sessions/${sessionId}`);
      const data = await res.json();
      // Parse shippingOption if it's a string
      if (typeof data.shippingOption === "string") {
        data.shippingOption = JSON.parse(data.shippingOption);
      }
      setSessionData(data);
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  // Defensive extraction
  const shippingOption = sessionData?.shippingOption || {};
  const paymentBrand = sessionData?.payment_method
    ? sessionData.payment_method.toUpperCase()
    : "N/A";
  const paymentLast4 = sessionData?.payment_last4
    ? sessionData.payment_last4
    : "----";
  const shippingPrice = typeof shippingOption.price === "number"
    ? shippingOption.price
    : 0;

  useEffect(() => {
    if (sessionData && typeof sessionData.total === "number" && typeof shippingPrice === "number") {
      const VAT_RATE = 0.2;
      // Defensive: total is in pence, shippingPrice is in pounds
      const totalPounds = sessionData.total / 100;
      const vat = ((totalPounds - shippingPrice) / (1 + VAT_RATE)) * VAT_RATE;
      setVatValue(vat > 0 ? vat : 0);
    }
  }, [sessionData, shippingPrice]);

  if (!sessionData) return <p>Loading...</p>;

  // Defensive subtotal calculation
  const totalPounds = typeof sessionData.total === "number" ? sessionData.total / 100 : 0;
  const subTotal = (totalPounds - (shippingPrice + vat_value)).toFixed(2);

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
            sessionData.items && Array.isArray(sessionData.items) ? (
              <div className='success_card_div'>
                {sessionData.items.map((item, index) => (
                  <SuccessCard
                    cart_item_price={`£${(item.amount / 100).toFixed(2)}`}
                    cart_item_quantity={item.quantity}
                    cart_item_size={item.size}
                    cart_item_title={item.name}
                    key={index}
                    identifier={index}
                    image={item.image}
                  />
                ))}
              </div>
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
            <p>Payment Method: <span>{paymentBrand} ending with **{paymentLast4.slice(0, 4)}</span></p>
            <p>SubTotal: <span>£{subTotal}</span></p>
            <p>VAT: <span>£{vat_value.toFixed(2)}</span></p>
            <p>Shipping: <span>£{shippingPrice.toFixed(2)}</span></p>
            <div className="total_price">
              <p>Total <span>£{totalPounds.toFixed(2)}</span></p>
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