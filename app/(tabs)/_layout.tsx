import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        title: 'Shop',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="shopping-bag" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="explore" options={{
        title: 'Explore',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="search" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="mycart" options={{
        title: 'Mycart',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="shopping-cart" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="favourite" options={{
        title: 'Favourite',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="heart" size={size} color={color} />
        ),
      }}
      />
      <Tabs.Screen name="account" options={{
        title: 'Account',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="settings" options={{ title: 'Cài đặt' }} />
    </Tabs>
  );
}