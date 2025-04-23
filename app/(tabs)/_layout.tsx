import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

export default function TabLayout() {
  return (
    <Tabs initialRouteName="index">
      {/* Tab 1 - Shop */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Shop',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-bag" size={size} color={color} />
          ),
        }}
      />

      {/* Tab 2 - Explore */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
        }}
      />

      {/* Tab 3 - Mycart */}
      <Tabs.Screen
        name="mycart"
        options={{
          title: 'Mycart',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),
        }}
      />

      {/* Tab 4 - Orders (Đã di chuyển xuống đây) */}
      <Tabs.Screen
        name="order-tracking"
        options={{
          title: 'Orders',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),
        }}
      />

      {/* Tab 5 - Favourite */}
      <Tabs.Screen
        name="favourite"
        options={{
          title: 'Favourite',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="heart" size={size} color={color} />
          ),
        }}
      />

      {/* Tab 6 - Account */}
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />

      {/* Tab 7 - Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Cài đặt',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}