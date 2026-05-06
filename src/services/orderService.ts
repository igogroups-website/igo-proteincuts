import { supabase } from '../lib/supabase';

export interface Order {
  id: string;
  customer_name: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  created_at: string;
  items: any[];
}

/**
 * Order Service
 * Handles live transaction management and status lifecycle.
 */

export const getOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    // Return mock data for demo/local dev
    return [
      { id: '#ORD-7821', customer_name: 'Arun Kumar', status: 'Delivered', amount: 1250, created_at: new Date().toISOString(), items: [] },
      { id: '#ORD-7820', customer_name: 'Priya Dharshini', status: 'Processing', amount: 890, created_at: new Date().toISOString(), items: [] },
    ] as Order[];
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Update Order Error:', err);
    return { success: false, error: err };
  }
};
