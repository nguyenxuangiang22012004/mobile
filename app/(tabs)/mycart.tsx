import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CartItem = ({ image, name, details, price }: { image: string; name: string; details: string; price: string }) => (
    <View style={styles.cartItem}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{name}</Text>
            <Text style={styles.itemDetailsText}>{details}</Text>
            <View style={styles.quantityControl}>
                <TouchableOpacity style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>1</Text>
                <TouchableOpacity style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.closeprice}>
            <View>
                <TouchableOpacity style={styles.deleteButton}>
                    <FontAwesome name="close" size={24} color="#B3B3B3" />
                </TouchableOpacity>
            </View>
            <Text style={styles.price}>{price}</Text>
        </View>
    </View>
);

const App = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>My Cart</Text>
            </View>

            {/* Cart Items */}
            <ScrollView style={styles.cartItems}>
                <CartItem image="https://placehold.co/64" name="Apple" details="1kg" price="$2.99" />
                <CartItem image="https://placehold.co/64" name="Orange" details="500g" price="$1.49" />
            </ScrollView>

            {/* Checkout Button */}
            <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
                <View style={styles.checkoutPrice}>
                    <Text style={styles.checkoutPriceText}>$12.96</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    deleteButton: {
        padding: 8, // Khoảng cách giữa nút X và giá
    },
    closeprice: {
        flexDirection: 'column', // Sắp xếp theo chiều dọc
        alignItems: 'center', // Căn giữa theo trục ngang
        justifyContent: 'space-between', // Dãn cách đều
        height: 80,
    }, // Chiều cao tối thiểu để tạo khoảng cách 
    container: { flex: 1, backgroundColor: 'white' },
    header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0', alignItems: 'center' },
    headerText: { fontSize: 20, fontWeight: 'bold' },
    cartItems: { padding: 16 },
    cartItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
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
        width: "80%",
        padding: 20,
        backgroundColor: "#53B175",
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginLeft: 38
    },
    checkoutButtonText: { color: 'white', fontSize: 16, paddingLeft: 45 },
    checkoutPrice: { backgroundColor: 'darkgreen', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4, width: "25%" },
    checkoutPriceText: { color: 'white' },
    navigation: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#e0e0e0' },
    navItem: { alignItems: 'center' },
    navText: { color: 'gray', fontSize: 12 },
    navTextActive: { color: 'green', fontSize: 12 },
});

export default App;
