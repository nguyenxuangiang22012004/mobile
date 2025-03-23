import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function CheckoutScreen() {
    const [deliveryMethod, setDeliveryMethod] = useState('Standard Delivery');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);

    // Giá mặc định
    const basePrice = 13.97;
    const totalCost = basePrice - discount;

    // Hàm xử lý mã khuyến mãi
    const applyPromoCode = () => {
        if (promoCode === 'DISCOUNT10') {
            setDiscount(2); // Giảm giá $2
            Alert.alert('Success', 'Promo code applied successfully!');
        } else {
            setDiscount(0);
            Alert.alert('Invalid', 'This promo code is not valid.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Checkout</Text>
                    <FontAwesome name="shopping-cart" size={24} color="black" />
                </View>

                <ScrollView style={styles.content}>
                    {/* Delivery Method */}
                    <View style={styles.row}>
                        <Text style={styles.label}>Delivery</Text>
                        <TouchableOpacity
                            style={styles.rowEnd}
                            onPress={() => setDeliveryMethod(deliveryMethod === 'Standard Delivery' ? 'Express Delivery' : 'Standard Delivery')}
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
                            onPress={() => setPaymentMethod(paymentMethod === 'Credit Card' ? 'PayPal' : 'Credit Card')}
                        >
                            <Text style={styles.value}>{paymentMethod}</Text>
                            <FontAwesome name="angle-right" size={20} color="gray" />
                        </TouchableOpacity>
                    </View>

                    {/* Promo Code Input */}
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

                    {/* Discount */}
                    <View style={styles.row}>
                        <Text style={styles.label}>Pick discount</Text>
                        <Text style={styles.value}>${discount.toFixed(2)}</Text>
                    </View>

                    {/* Total Cost */}
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Cost</Text>
                        <Text style={styles.value}>${totalCost.toFixed(2)}</Text>
                    </View>
                </ScrollView>

                {/* Order Button */}
                <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Order Placed!', 'Thank you for your order.')}>
                    <Text style={styles.buttonText}>Place Order</Text>
                </TouchableOpacity>

                {/* Terms & Conditions */}
                <Text style={styles.footerText}>
                    By placing an order you agree to our{' '}
                    <Text style={styles.footerLink}>Terms And Conditions</Text>
                </Text>
            </View>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
    },
    content: {
        marginBottom: 20,
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
    },
    rowEnd: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    value: {
        color: '#6b7280',
        marginRight: 10,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        fontSize: 14,
        width: 120,
        marginRight: 10,
    },
    applyText: {
        color: '#10b981',
        fontWeight: 'bold',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#10b981',
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
    footerText: {
        fontSize: 12,
        color: '#6b7280',
        textAlign: 'center',
        marginTop: 10,
    },
    footerLink: {
        color: 'black',
        fontWeight: '600',
    },
});

