import { useEffect, useState } from 'react';
import { Slot, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '@/components/SplashScreen';

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
      if (router.canGoBack()) {
        router.replace('/onboarding');
      }
    }, 100); // Đợi một chút để đảm bảo Root Layout được mount
    return null;
  }

  return <Slot />;
}
