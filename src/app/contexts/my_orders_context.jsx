"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth_context';
import { supabase_client } from '@/utils/supabase/clint';


const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([])
    const { user_email } = useAuth();
    const [loading, setLoading] = useState(true);
    const supabase = supabase_client;

    useEffect(() => {
        if (!user_email) {
            setOrders([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const fetchOrders = async () => {
            const { data, error } = await supabase
                .from('client_orders')
                .select('*')
                .eq('email', user_email)
                .order('created_at', { ascending: false });

            if (error) {
                console.error(error);
                setOrders([]);
            } else {
                setOrders(data || []);
            }

            setLoading(false);
        };
        fetchOrders();
    }, [user_email])

    return (
        <OrderContext.Provider value={{ orders, setOrders, loading, setLoading }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrders = () => {
    const context = useContext(OrderContext)
    return context
}