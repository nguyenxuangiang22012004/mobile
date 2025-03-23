import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
const FavouriteScreen: React.FC = () => {
    const favouriteItems = [
        { name: 'Sprite Can', size: '325ml', price: '$1.50', image: 'https://placehold.co/50x50' },
        { name: 'Diet Coke', size: '355ml', price: '$1.99', image: 'https://placehold.co/50x50' },
        { name: 'Apple & Grape Juice', size: '2L', price: '$15.50', image: 'https://placehold.co/50x50' },
        { name: 'Coca Cola Can', size: '325ml', price: '$4.99', image: 'https://placehold.co/50x50' },
        { name: 'Pepsi Can', size: '330ml', price: '$4.99', image: 'https://placehold.co/50x50' },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Favourite</Text>
            </View>

            {/* Items List */}
            <ScrollView style={styles.list}>
                {favouriteItems.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemSize}>{item.size}</Text>
                        </View>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                        <AntDesign name="right" size={24} color="black" />
                    </View>
                ))}
            </ScrollView>

            {/* Add All To Cart Button */}
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add All To Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    time: {
        fontSize: 14,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 60,
    },
    list: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    itemImage: {
        width: 50,
        height: 50,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 16,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemSize: {
        color: 'gray',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10
    },
    addButton: {
        width: "80%",
        padding: 20,
        backgroundColor: "#53B175",
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        marginLeft: 38
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: 'gray',
    },
    navTextActive: {
        color: 'green',
    },
});

export default FavouriteScreen;
