import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useCart } from '../app/CartContext';

type Product = {
    id: number;
    name: string;
    size: string;
    price: string;
    image: string | any;
};

const products: Record<string, Product[]> = {
    "Frash Fruits & Vegetable": [
        { id: 1, name: "Apple", size: "1kg", price: "$2.99", image: require("../assets/images/coka.png") },
        { id: 2, name: "Carrot", size: "500g", price: "$1.49", image: require("../assets/images/coka.png") },
        { id: 3, name: "Apple", size: "1kg", price: "$2.99", image: require("../assets/images/coka.png") },
        { id: 4, name: "Carrot", size: "500g", price: "$1.49", image: require("../assets/images/coka.png") },
        { id: 5, name: "Apple", size: "1kg", price: "$2.99", image: require("../assets/images/coka.png") },
        { id: 6, name: "Carrot", size: "500g", price: "$1.49", image: require("../assets/images/coka.png") },
    ],
    Beverages: [
        { id: 1, name: "Coca Cola", size: "500ml", price: "$1.99", image: require("../assets/images/coka.png") },
        { id: 2, name: "Orange Juice", size: "1L", price: "$3.99", image: require("../assets/images/coka.png") },
        { id: 3, name: "Coca Cola", size: "500ml", price: "$1.99", image: require("../assets/images/coka.png") },
        { id: 4, name: "Orange Juice", size: "1L", price: "$3.99", image: require("../assets/images/coka.png") },
        { id: 5, name: "Coca Cola", size: "500ml", price: "$1.99", image: require("../assets/images/coka.png") },
        { id: 6, name: "Orange Juice", size: "1L", price: "$3.99", image: require("../assets/images/coka.png") },
    ],
};

const CategoryScreen = () => {
    const { title } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const categoryTitle = title ? decodeURIComponent(title as string) : "Products";
    const categoryProducts = products[categoryTitle] || [];

    const handleAddToCart = (product: Product) => {
        addToCart({
            title: product.name,
            subtitle: product.size,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleicon}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.header}>{categoryTitle}</Text>
                <TouchableOpacity onPress={() => router.push('/mycart')}>
                    <AntDesign name="right" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={categoryProducts}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.productCard}
                        onPress={() =>
                            router.push({
                                pathname: '/productdetail',
                                params: {
                                    title: item.name,
                                    subtitle: item.size,
                                    price: item.price,
                                    image: item.name.toLowerCase(), // Chuẩn hóa thành chữ thường
                                },
                            })
                        }
                    >
                        <Image
                            source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                            style={styles.image}
                        />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.size}>{item.size}</Text>

                        <View style={styles.footer}>
                            <Text style={styles.price}>{item.price}</Text>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => handleAddToCart(item)}
                            >
                                <FontAwesome name="plus" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    titleicon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    row: {
        justifyContent: "space-between",
    },
    productCard: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        padding: 10,
        margin: 5,
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5,
    },
    size: {
        fontSize: 14,
        color: "gray",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#53B175",
    },
    addButton: {
        backgroundColor: "#53B175",
        padding: 8,
        borderRadius: 5,
    },
});

export default CategoryScreen;