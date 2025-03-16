import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
    const router = useRouter();

    const resetOnboarding = async () => {
        await AsyncStorage.removeItem('alreadyLaunched'); // Xóa dữ liệu onboarding
        Alert.alert('Reset thành công', 'Lần tới mở app sẽ chạy lại Onboarding');
        router.replace('/onboarding'); // Chuyển hướng ngay lập tức
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Cài đặt</Text>
            <Button title="Chạy lại Onboarding" onPress={resetOnboarding} />
        </View>
    );
}
