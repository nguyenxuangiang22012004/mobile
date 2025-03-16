import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import { useRouter } from 'expo-router';

const beverages = [
  {
    name: 'Diet Coke',
    size: '355ml',
    price: '$1.99',
    image: 'https://storage.googleapis.com/a1aa/image/VKNRu1bEbHVYjFNhnMxGUrY_itGG6F5mYc7BnccB4T4.jpg',
  },
  {
    name: 'Sprite Can',
    size: '325ml',
    price: '$1.50',
    image: 'https://storage.googleapis.com/a1aa/image/rbAkPhnEovyC2KhlzfldixhDLO5esUHydvycxx5Nh9s.jpg',
  },
  {
    name: 'Apple & Grape Juice',
    size: '2L',
    price: '$15.99',
    image: 'https://storage.googleapis.com/a1aa/image/ycwpxrdx_mCLzhalTTaTbroyHGCJgXsP96AUugsLhB8.jpg',
  },
  {
    name: 'Orange Juice',
    size: '2L',
    price: '$15.99',
    image: 'https://storage.googleapis.com/a1aa/image/2lEaTkN_ty0HxbpdOE0KwTLWd6AQ3-E0reQOCpLcylU.jpg',
  },
  {
    name: 'Coca Cola Can',
    size: '325ml',
    price: '$4.99',
    image: 'https://storage.googleapis.com/a1aa/image/m3-QH6deP0ESPIpTWz7mpiucPNcXHdnlcmUUVk1n37U.jpg',
  },
  {
    name: 'Pepsi Can',
    size: '330ml',
    price: '$4.99',
    image: 'https://storage.googleapis.com/a1aa/image/aatlLc1BNRqU4hcdffp_keZ8FGIWdDfaTHIOLNHwNEI.jpg',
  },
];

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Explore Screen</Text>
      <Button title="Back to Home" onPress={() => router.push('/')} />
      <Text style={styles.headerTitle}>Beverages</Text>
      <View style={styles.grid}>
        {beverages.map((beverage, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: beverage.image }} style={styles.image} />
            <Text style={styles.name}>{beverage.name}</Text>
            <Text style={styles.size}>{beverage.size}</Text>
            <View style={styles.footer}>
              <Text style={styles.price}>{beverage.price}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={{ color: 'white' }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  size: {
    color: '#6b7280',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#10b981',
    borderRadius: 50,
    padding: 8,
  },
});