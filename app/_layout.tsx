import { useEffect, useState } from 'react';
import { Stack, useRouter, Slot } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '@/components/SplashScreen';
import { CartProvider } from '../app/CartContext'; // Đảm bảo đường dẫn đúng
import { FavouriteProvider } from './FavouriteContext';
export default function Layout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkFirstLaunch() {
      const value = await AsyncStorage.getItem('alreadyLaunched');
      if (value === null) {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000); // Giả lập splash 2s
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  if (isFirstLaunch === null) {
    return null; // Chờ kiểm tra AsyncStorage
  }

  if (isFirstLaunch) {
    setTimeout(() => {
      router.replace('/onboarding');
    }, 100);
    return null;
  }

  return (
    <CartProvider>
      <FavouriteProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="signin" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="productdetail" />
          <Stack.Screen name="category" />
          <Stack.Screen name="mycart" options={{ title: 'My Cart' }} />

        </Stack>
      </FavouriteProvider>
    </CartProvider>
  );
}
