import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
    title: string;
    subtitle: string;
    price: string;
    image: any;
    quantity: number;
}

interface CartContextValue {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>; // Thêm setCartItems
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem.title === item.title);
            if (existingItem) {
                return prevItems.map((cartItem) =>
                    cartItem.title === item.title
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextValue => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};