import React, { createContext, useContext, useState } from 'react';

interface CartItem {
    title: string;
    subtitle: string;
    price: string;
    image: any;
    quantity: number;
}

interface Order {
    id: string;
    items: CartItem[];
    placementDate: Date;
    status: 'Preparing Order' | 'Order Shipped';
    recipientInfo?: {
        name: string;
        phone: string;
        address: string;
    };
    deliveryMethod?: string;
    paymentMethod?: string;
    totalCost?: number;
}

interface OrderContextType {
    orders: Order[];
    addOrder: (order: Order) => void;
    removeOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    const addOrder = (order: Order) => {
        setOrders(prev => [...prev, order]);
    };

    const removeOrder = (orderId: string) => {
        setOrders(prev => prev.filter(order => order.id !== orderId));
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, removeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};