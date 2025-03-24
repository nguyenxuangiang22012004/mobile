import React, { createContext, useContext, useState } from "react";

// Định nghĩa kiểu dữ liệu cho sản phẩm
export interface CartItem {
    title: string;
    subtitle: string;
    price: string;
    image: any;
    quantity: number;
}

// Context lưu trạng thái giỏ hàng
const CartContext = createContext<{
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (title: string) => void;
} | null>(null);

// Provider cho giỏ hàng
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Hàm thêm sản phẩm vào giỏ hàng
    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.title === item.title);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.title === item.title
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (title: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.title !== title));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook sử dụng giỏ hàng
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
