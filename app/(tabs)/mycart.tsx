import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    TextInput,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from '../CartContext';
import Checkbox from 'expo-checkbox';

// Định nghĩa kiểu cho CartItem
interface CartItem {
    title: string;
    subtitle: string;
    price: string;
    image: any;
    quantity: number;
}

// Định nghĩa kiểu cho thông tin khách hàng từ ProfileScreen
interface CustomerInfo {
    name: string;
    phone: string;
    address: string;
}

// Định nghĩa props cho CartItem component
interface CartItemProps {
    item: CartItem;
    onRemove: (title: string) => void;
    onUpdateQuantity: (title: string, newQuantity: number) => void;
    onSelect: (title: string, isSelected: boolean) => void;
    isSelected: boolean;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity, onSelect, isSelected }) => {
    const price = parseFloat(item.price.replace('$', '')) * item.quantity;

    return (
        <View style={styles.cartItem}>
            <Checkbox
                value={isSelected}
                onValueChange={(value) => onSelect(item.title, value)}
                style={styles.checkbox}
                color={isSelected ? '#53B175' : undefined}
            />
            <Image source={item.image} style={styles.image} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemDetailsText}>{item.subtitle}</Text>
                <View style={styles.quantityControl}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => onUpdateQuantity(item.title, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => onUpdateQuantity(item.title, item.quantity + 1)}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.closeprice}>
                <TouchableOpacity style={styles.deleteButton} onPress={() => onRemove(item.title)}>
                    <FontAwesome name="close" size={24} color="#B3B3B3" />
                </TouchableOpacity>
                <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
        </View>
    );
};

const App = () => {
    const { cartItems, setCartItems } = useCart();
    const [showCheckout, setShowCheckout] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>(cartItems.map(item => item.title));
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const blurAnim = useRef(new Animated.Value(1)).current;
    const router = useRouter();

    // Mock customer info from ProfileScreen (in a real app, this would come from a context or API)
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        name: 'Afsar Hossen',
        phone: '+123 456 7890',
        address: '123 Main Street, City, Country',
    });

    // State để quản lý thông tin chỉnh sửa trong checkout
    const [recipientInfo, setRecipientInfo] = useState<CustomerInfo>({
        name: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address,
    });

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: showCheckout ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(blurAnim, {
                toValue: showCheckout ? 0.3 : 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [showCheckout]);

    const [deliveryMethod, setDeliveryMethod] = useState('Standard Delivery');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
    const [showError, setShowError] = useState(false);

    // Handle item selection
    const handleSelectItem = (title: string, isSelected: boolean) => {
        setSelectedItems(prev =>
            isSelected ? [...prev, title] : prev.filter(item => item !== title)
        );
    };

    // Handle input change for recipient info
    const handleRecipientInputChange = (field: keyof CustomerInfo, value: string) => {
        setRecipientInfo(prev => ({ ...prev, [field]: value }));
    };

    // Tính tổng giá tiền của các sản phẩm được chọn
    const totalCost = cartItems
        .filter(item => selectedItems.includes(item.title))
        .reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', '')) * item.quantity;
            return total + price;
        }, 0) - discount;

    // Xử lý tăng/giảm số lượng
    const handleUpdateQuantity = (title: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.title === title ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Xử lý xóa sản phẩm
    const handleRemoveItem = (title: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.title !== title));
        setSelectedItems(prev => prev.filter(item => item !== title));
    };

    // Xử lý áp dụng mã giảm giá
    const applyPromoCode = () => {
        if (promoCode === 'DISCOUNT10') {
            setDiscount(2);
            Alert.alert('Success', 'Promo code applied successfully!');
        } else {
            setDiscount(0);
            Alert.alert('Invalid', 'This promo code is not valid.');
        }
    };

    // Xử lý thanh toán
    const handlePayment = () => {
        if (selectedItems.length === 0) {
            Alert.alert('Error', 'Please select at least one item to checkout.');
            return;
        }
        if (!recipientInfo.name || !recipientInfo.phone || !recipientInfo.address) {
            Alert.alert('Error', 'Please fill in all recipient information.');
            return;
        }
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) {
            setPaymentStatus('success');
            setCartItems(prev => prev.filter(item => !selectedItems.includes(item.title)));
            setSelectedItems([]);
            router.push('/orderaccept');
        } else {
            setPaymentStatus('failed');
            setShowError(true);
        }
    };

    // Xử lý thử lại khi thanh toán thất bại
    const handleTryAgain = () => {
        setShowError(false);
        setPaymentStatus('pending');
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.myCart, { opacity: blurAnim }]}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>My Cart</Text>
                </View>
                {cartItems.length === 0 ? (
                    <View style={styles.emptyCart}>
                        <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    </View>
                ) : (
                    <ScrollView style={styles.cartItems}>
                        {cartItems.map((item, index) => (
                            <CartItemComponent
                                key={index}
                                item={item}
                                onRemove={handleRemoveItem}
                                onUpdateQuantity={handleUpdateQuantity}
                                onSelect={handleSelectItem}
                                isSelected={selectedItems.includes(item.title)}
                            />
                        ))}
                    </ScrollView>
                )}
                {cartItems.length > 0 && (
                    <TouchableOpacity style={styles.checkoutButton} onPress={() => setShowCheckout(true)}>
                        <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
                        <View style={styles.checkoutPrice}>
                            <Text style={styles.checkoutPriceText}>${totalCost.toFixed(2)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </Animated.View>

            {showCheckout && (
                <TouchableWithoutFeedback
                    onPress={(event) => {
                        if (event.target === event.currentTarget) {
                            setShowCheckout(false);
                        }
                    }}
                >
                    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                        <View style={styles.card}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Checkout</Text>
                            </View>

                            <ScrollView style={styles.content}>
                                {/* Recipient Information */}
                                <View style={styles.row}>
                                    <Text style={styles.label}>Recipient Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={recipientInfo.name}
                                        onChangeText={(text) => handleRecipientInputChange('name', text)}
                                        placeholder="Enter recipient name"
                                    />
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Phone Number</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={recipientInfo.phone}
                                        onChangeText={(text) => handleRecipientInputChange('phone', text)}
                                        placeholder="Enter phone number"
                                        keyboardType="phone-pad"
                                    />
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Address</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={recipientInfo.address}
                                        onChangeText={(text) => handleRecipientInputChange('address', text)}
                                        placeholder="Enter address"
                                    />
                                </View>

                                {/* Delivery Method */}
                                <View style={styles.row}>
                                    <Text style={styles.label}>Delivery</Text>
                                    <TouchableOpacity
                                        style={styles.rowEnd}
                                        onPress={() =>
                                            setDeliveryMethod(
                                                deliveryMethod === 'Standard Delivery' ? 'Express Delivery' : 'Standard Delivery'
                                            )
                                        }
                                    >
                                        <Text style={styles.value}>{deliveryMethod}</Text>
                                        <FontAwesome name="angle-right" size={20} color="gray" />
                                    </TouchableOpacity>
                                </View>

                                {/* Payment Method */}
                                <View style={styles.row}>
                                    <Text style={styles.label}>Payment</Text>
                                    <TouchableOpacity
                                        style={styles.rowEnd}
                                        onPress={() =>
                                            setPaymentMethod(paymentMethod === 'Credit Card' ? 'PayPal' : 'Credit Card')
                                        }
                                    >
                                        <Text style={styles.value}>{paymentMethod}</Text>
                                        <FontAwesome name="angle-right" size={20} color="gray" />
                                    </TouchableOpacity>
                                </View>

                                {/* Promo Code */}
                                <View style={styles.row}>
                                    <Text style={styles.label}>Promo Code</Text>
                                    <View style={styles.rowEnd}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter code"
                                            value={promoCode}
                                            onChangeText={setPromoCode}
                                        />
                                        <TouchableOpacity onPress={applyPromoCode}>
                                            <Text style={styles.applyText}>Apply</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Total Cost */}
                                <View style={styles.row}>
                                    <Text style={styles.label}>Total Cost</Text>
                                    <Text style={styles.cost}>${totalCost.toFixed(2)}</Text>
                                </View>
                            </ScrollView>

                            <TouchableOpacity style={styles.button} onPress={handlePayment}>
                                <Text style={styles.buttonText}>Place Order</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            )}

            {showError && (
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                    <View style={styles.card}>
                        <TouchableOpacity
                            style={styles.closeIconContainer}
                            onPress={() => router.push('/(tabs)')}
                        >
                            <AntDesign name="close" size={24} color="#1F2937" />
                        </TouchableOpacity>

                        <View style={styles.iconContainer}>
                            <Image
                                source={require('../../assets/images/order-failed.png')}
                                style={styles.imageIcon}
                            />
                        </View>
                        <Text style={styles.title}>Oops! Order Failed</Text>
                        <Text style={styles.subtitle}>Something went terribly wrong</Text>

                        <TouchableOpacity style={styles.button} onPress={handleTryAgain}>
                            <Text style={styles.buttonText}>Please Try Again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/(tabs)')}>
                            <Text style={styles.linkText}>Back to home</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    emptyCartText: {
        fontSize: 18,
        color: '#6B7280',
    },
    iconContainer: {
        position: 'relative',
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageIcon: {
        width: 130,
        height: 120,
        marginLeft: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#4B5563',
        marginBottom: 24,
        textAlign: 'center',
    },
    linkText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 16,
        textAlign: 'center',
    },
    closeIconContainer: {
        alignSelf: 'flex-end',
        marginBottom: 16,
    },
    cost: {
        color: '#181725',
        fontSize: 16,
    },
    content: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: 'white',
        width: 320,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    deleteButton: {
        padding: 8,
    },
    myCart: { flex: 1 },
    closeprice: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
    },
    container: { flex: 1, backgroundColor: 'white' },
    header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0', alignItems: 'center' },
    headerText: { fontSize: 20, fontWeight: 'bold' },
    cartItems: { padding: 16 },
    cartItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
    checkbox: { marginRight: 10 },
    image: { width: 64, height: 64 },
    itemDetails: { flex: 1, marginLeft: 16 },
    itemName: { fontSize: 16, fontWeight: 'bold', marginBottom: 3 },
    itemDetailsText: { color: 'gray' },
    quantityControl: { flexDirection: 'row', alignItems: 'center', marginTop: 13, marginLeft: -11 },
    quantityButton: { width: 32, height: 32, borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 16, alignItems: 'center', justifyContent: 'center', margin: 8 },
    quantityButtonText: { fontSize: 16 },
    quantityText: { marginHorizontal: 8 },
    price: { fontSize: 16, fontWeight: 'bold' },
    checkoutButton: {
        width: '80%',
        padding: 20,
        backgroundColor: '#53B175',
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginLeft: 38,
    },
    checkoutButtonText: { color: 'white', fontSize: 16, paddingLeft: 45 },
    checkoutPrice: { backgroundColor: 'darkgreen', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4, width: '30%' },
    checkoutPriceText: { color: 'white' },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        paddingVertical: 15,
    },
    label: {
        color: '#6b7280',
        fontSize: 16,
        width: 120, // Ensure labels have consistent width
    },
    rowEnd: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    value: {
        color: '#181725',
        marginRight: 10,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        fontSize: 14,
        flex: 1, // Take remaining space
        marginLeft: 10,
    },
    applyText: {
        color: '#10b981',
        fontWeight: 'bold',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#53B175',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default App;