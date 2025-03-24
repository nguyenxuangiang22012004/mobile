import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const App = () => {
  const router = useRouter();

  const categories = [
    { title: "Frash Fruits & Vegetable", image: require("../../assets/images/frashfruit.png") },
    { title: "Cooking Oil & Ghee", image: require("../../assets/images/cookingoil.png") },
    { title: "Meat & Fish", image: require("../../assets/images/meatfish.png") },
    { title: "Bakery & Snacks", image: require("../../assets/images/baketysnack.png") },
    { title: "Dairy & Eggs", image: require("../../assets/images/eggs.png") },
    { title: "Beverages", image: require("../../assets/images/nuocngot.png") },
  ];

  const colors = ["#53B175", "#F8A44C", "#F7A593", "#D3B0E0", "#FDE598", "#B7DFF5"];


  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Find Products</Text>

      {/* Product Categories */}
      <ScrollView contentContainerStyle={styles.grid}>
        {categories.map((item, index) => {
          const backgroundColor = colors[index % colors.length] + "55"; // Giảm độ sáng
          return (
            <TouchableOpacity
              key={index}
              style={[styles.card, { backgroundColor, borderColor: colors[index % colors.length] }]}
              onPress={() => router.push(`/category?title=${encodeURIComponent(item.title)}`)}
            >
              <Image source={item.image} style={styles.image} />
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
  header: { textAlign: 'center', fontSize: 20, fontWeight: '600', marginBottom: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 40 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 16,
  },
  image: { width: 100, height: 100, marginBottom: 8 },
  cardText: { textAlign: 'center', fontSize: 14, fontWeight: '500' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  footerItem: { alignItems: 'center' },
  footerText: { fontSize: 12, marginTop: 4 },
});

export default App;
