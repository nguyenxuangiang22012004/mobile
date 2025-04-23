import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useOrder } from './OrderContext';

// Định nghĩa kiểu cho CartItem (tái sử dụng từ App.tsx)
interface CartItem {
    title: string;
    subtitle: string;
    price: string;
    image: any;
    quantity: number;
}

// Định nghĩa kiểu cho Order
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

// Hàm tính ngày dự kiến giao hàng (1 ngày sau ngày đặt hàng)
const getExpectedDeliveryDate = (placementDate: Date): string => {
    const deliveryDate = new Date(placementDate);
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    return deliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Component hiển thị thông tin từng đơn hàng
const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
    const totalCost = order.totalCost || order.items.reduce((total, item) => {
        const price = parseFloat(item.price.replace('$', '')) * item.quantity;
        return total + price;
    }, 0);

    return (
        <View style={styles.orderItem}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{order.id}</Text>
                <Text style={styles.orderDate}>
                    Placed on {order.placementDate.toLocaleDateString('en-US')}
                </Text>
            </View>
            <View style={styles.orderDetails}>
                <Text style={styles.orderStatus}>Status: {order.status}</Text>
                <Text style={styles.deliveryDate}>
                    Expected Delivery: {getExpectedDeliveryDate(order.placementDate)}
                </Text>
                {order.recipientInfo && (
                    <>
                        <Text style={styles.orderInfo}>Recipient: {order.recipientInfo.name}</Text>
                        <Text style={styles.orderInfo}>Phone: {order.recipientInfo.phone}</Text>
                        <Text style={styles.orderInfo}>Address: {order.recipientInfo.address}</Text>
                    </>
                )}
                {order.deliveryMethod && (
                    <Text style={styles.orderInfo}>Delivery: {order.deliveryMethod}</Text>
                )}
                {order.paymentMethod && (
                    <Text style={styles.orderInfo}>Payment: {order.paymentMethod}</Text>
                )}
                <Text style={styles.orderTotal}>Total: ${totalCost.toFixed(2)}</Text>
            </View>
            <View style={styles.orderItems}>
                {order.items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                        <Image source={item.image} style={styles.itemImage} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.title}</Text>
                            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                            <Text style={styles.itemPrice}>
                                ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)} (x{item.quantity})
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const OrderTrackingScreen: React.FC = () => {
    const router = useRouter();
    const { orders } = useOrder();

    return (
        <View style={styles.container}>
            {orders.length === 0 ? (
                <View style={styles.emptyOrders}>
                    <Text style={styles.emptyOrdersText}>No orders found</Text>
                </View>
            ) : (
                <ScrollView style={styles.orderList}>
                    {orders.map(order => (
                        <OrderItem key={order.id} order={order} />
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#181725',
    },
    backButton: {
        padding: 8,
    },
    emptyOrders: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    emptyOrdersText: {
        fontSize: 18,
        color: '#6B7280',
    },
    orderList: {
        padding: 16,
    },
    orderItem: {
        backgroundColor: '#F9FAFB',
        borderRadius: 10,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#181725',
    },
    orderDate: {
        fontSize: 14,
        color: '#6B7280',
    },
    orderDetails: {
        marginBottom: 12,
    },
    orderStatus: {
        fontSize: 16,
        color: '#53B175',
        fontWeight: '600',
        marginBottom: 4,
    },
    deliveryDate: {
        fontSize: 14,
        color: '#181725',
        marginBottom: 4,
    },
    orderInfo: {
        fontSize: 14,
        color: '#181725',
        marginBottom: 4,
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#181725',
        marginTop: 4,
    },
    orderItems: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingTop: 12,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemImage: {
        width: 48,
        height: 48,
        borderRadius: 8,
        marginRight: 12,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#181725',
    },
    itemSubtitle: {
        fontSize: 12,
        color: '#6B7280',
    },
    itemPrice: {
        fontSize: 12,
        color: '#181725',
        fontWeight: '600',
    },
});

export default OrderTrackingScreen;