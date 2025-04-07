import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '@/components/SplashScreen';
import { CartProvider } from './CartContext';
import { FavouriteProvider } from './FavouriteContext';

export default function Layout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const value = await AsyncStorage.getItem('alreadyLaunched');
        if (value === null) {
          await AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
        setIsFirstLaunch(false);
      } finally {
        setLoading(false);
      }
    }

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (!loading && isFirstLaunch) {
      router.replace('/onboarding');
    }
  }, [loading, isFirstLaunch, router]);

  if (loading || isFirstLaunch === null) {
    return <SplashScreen />;
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
          <Stack.Screen name="forgot-password" />
          <Stack.Screen name="onboarding" />
        </Stack>
      </FavouriteProvider>
    </CartProvider>
  );
}