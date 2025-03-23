import React, { useState } from 'react';
import {
    View, Text, Image, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import { images } from "../assets/images/images"; // Import danh sách ảnh
import { Ionicons } from "@expo/vector-icons";
const imageMap: Record<string, any> = {
    "Organic Bananas": require("../assets/images/banana.png"),
    "Red Apple": require("../assets/images/apple.png"),
    "Bell Pepper Red": require("../assets/images/bell_pepper.png"),
    "Ginger": require("../assets/images/ginger.png"),
    "Beef Bone": require("../assets/images/beefBone.png"),
    "Broiler Chicken": require("../assets/images/boiler_chicken.png"),
};
const ProductPage = () => {
    const params = useLocalSearchParams();
    const imageKey = Array.isArray(params.image) ? params.image[0] : params.image;
    const { title, price, image } = params;
    const [liked, setLiked] = useState(false);

    // Lấy ảnh từ map, nếu không có thì dùng ảnh mặc định
    const imageSource = imageMap[imageKey] || require("../assets/images/apple.png");
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <FontAwesome name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.productTitle}>Product</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <Feather name="upload" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                {/* Product Image */}
                <View style={styles.imagedaidien}>
                    <Image source={imageSource} style={styles.productImage} />
                </View>
                {/* Product Info */}
                <View style={styles.productInfo}>
                    <View style={styles.productHeader}>
                        <View>
                            <Text style={styles.productTitle}>{params.title}</Text>
                            <Text style={styles.productSubtitle}>{params.subtitle}</Text>
                        </View>

                        <TouchableOpacity onPress={() => setLiked(!liked)}>
                            <Ionicons name={liked ? "heart" : "heart-outline"} size={24} color={liked ? "red" : "gray"} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.productPriceContainer}>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity>
                                <Text style={styles.quantityButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>1</Text>
                            <TouchableOpacity>
                                <Text style={styles.quantityButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.productPrice}>{params.price}</Text>
                    </View>
                </View>

                {/* Product Details */}
                <View style={styles.productDetails}>
                    <View style={styles.detailSection}>
                        <View style={styles.productdetail}>
                            <View style={styles.detailHeader}>
                                <Text style={styles.detailTitle}>Product Detail</Text>
                            </View>
                            <Text style={styles.detailText}>
                                Apples Are Nutritious. Apples May Be Good For Weight Loss.
                                Apples May Be Good For Your Heart. As Part Of A Healthful And Varied Diet.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.detailSection}>
                        <Text style={styles.detailTitle}>Nutritions</Text>
                        <Text style={styles.detailSubtitle}>100gr</Text>
                    </View>

                    <View style={styles.detailSection}>
                        <Text style={styles.detailTitle}>Review</Text>
                        <View style={styles.reviewStars}>
                            {[...Array(5)].map((_, i) => (
                                <FontAwesome key={i} name="star" size={20} color="#FFD700" />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Add to Basket Button */}
            <View style={styles.addToBasketContainer}>
                <TouchableOpacity style={styles.addToBasketButton}>
                    <Text style={styles.addToBasketText}>Add To Basket</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    productdetail: {
        flexDirection: 'column',
    },
    imagedaidien: {
        backgroundColor: 'white',
    },
    productImage: {
        width: 200, height: 200, resizeMode: "contain", alignSelf: "center"
    },
    container: {
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    imageContainer: {
        padding: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    productInfo: {
        padding: 16,
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productSubtitle: {
        color: '#6B7280',
    },
    productPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    quantityButton: {
        fontSize: 24,
    },
    quantityText: {
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 8,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productDetails: {
        padding: 16,
        flexDirection: 'column',
    },
    detailSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 16,
        marginTop: 16,
    },
    detailHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    detailSubtitle: {
        color: '#6B7280',
    },
    detailText: {
        color: '#6B7280',
        marginTop: 10,
    },
    reviewStars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addToBasketContainer: {
        padding: 16,
    },
    addToBasketButton: {
        backgroundColor: '#10B981',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    addToBasketText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ProductPage;
