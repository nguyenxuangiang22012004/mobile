import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, Image, SafeAreaView, ScrollView
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Link } from "expo-router";
import { useRouter } from 'expo-router'
const SignUpScreen: React.FC = () => {
    const [username, setUsername] = useState('Afsar Hossen Shuvo');
    const [email, setEmail] = useState('imshuvo97@gmail.com');
    const [password, setPassword] = useState('••••••••');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <View>
                        <FontAwesome5 name="carrot" size={50} color="orange" />
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>Enter your credentials to continue</Text>

                {/* Username Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.icon} onPress={() => setShowPassword(!showPassword)}>
                            <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} color="gray" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Terms & Conditions */}
                <Text style={styles.termsText}>
                    By continuing you agree to our <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>.
                </Text>

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                {/* Already have an account? */}
                <Link href="/login" asChild>
                    <TouchableOpacity onPress={() => router.push('/login')}>
                        <Text style={styles.footerText}>Already have an account? <Text style={styles.loginText}>Log In</Text></Text>
                    </TouchableOpacity>
                </Link>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 16 },
    logoContainer: { alignItems: 'center', marginBottom: 24 },
    logo: { width: 50, height: 50 },
    title: { fontSize: 24, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
    subtitle: { textAlign: 'center', color: 'gray', marginBottom: 24 },
    inputContainer: { width: "100%", marginBottom: 15 },
    label: { fontSize: 14, color: 'gray', marginBottom: 4 },
    input: {
        width: "100%",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        backgroundColor: "#FFF",
    },
    inputWrapper: { position: 'relative' },
    icon: { position: 'absolute', right: 12, top: '50%', transform: [{ translateY: -10 }] },
    termsText: { fontSize: 12, color: 'gray', marginBottom: 24, textAlign: 'center' },
    link: { color: 'green' },
    button: {
        width: "100%",
        padding: 15,
        backgroundColor: "#53B175",
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: { color: 'white', fontSize: 16, fontWeight: '600', },
    footerText: { textAlign: 'center', color: 'gray', marginTop: 24 },
    loginText: { fontSize: 14, color: "black" },
});

export default SignUpScreen;
