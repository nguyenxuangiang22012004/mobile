import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Shop', headerShown: false }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', headerShown: false }} />
      <Tabs.Screen name="mycart" options={{ title: 'Mycart', headerShown: false }} />
      <Tabs.Screen name="favourite" options={{ title: 'Favourite', headerShown: false }} />
      <Tabs.Screen name="settings" options={{ title: 'Cài đặt' }} />
    </Tabs>
  );
}