import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AllProducts = () => {
    const router = useRouter();
    const { title, items } = useLocalSearchParams();

    // Parse items từ JSON string về mảng object
    const parsedItems = items ? JSON.parse(items as string) : [];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{title}</Text>
            <FlatList
                data={parsedItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            router.push({
                                pathname: "/productdetail",
                                params: {
                                    title: item.title,
                                    price: item.price,
                                    image: item.image,
                                    subtitle: item.subtitle,
                                },
                            })
                        }
                    >
                        <Image source={item.image} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.cardPrice}>{item.price}</Text>
                            <TouchableOpacity style={styles.addButton}>
                                <Ionicons name="add" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    card: { backgroundColor: "#f9f9f9", padding: 15, marginBottom: 10, borderRadius: 10 },
    cardImage: { width: 80, height: 80, resizeMode: "contain" },
    cardTitle: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
    cardSubtitle: { fontSize: 14, color: "gray" },
    cardFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    cardPrice: { fontSize: 16, fontWeight: "bold", color: "#FF6B00" },
    addButton: { backgroundColor: "#FF6B00", padding: 8, borderRadius: 5 },
});

export default AllProducts;
