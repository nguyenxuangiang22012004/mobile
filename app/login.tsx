import React, { useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useRouter } from 'expo-router'
export default function SignInScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const handleLogin = () => {
        console.log("Email:", email);
        console.log("Password:", password);
        // Thêm logic xử lý đăng nhập tại đây
    };

    return (
        <View style={styles.container}>
            <View style={styles.carrot}>
                <FontAwesome5 name="carrot" size={70} color="orange" />
            </View>

            {/* Title */}
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Enter your email and password</Text>

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
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputFlex}
                        placeholder="Enter your password"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Link href="/(tabs)" asChild>
                <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/(tabs)')} >
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>
            </Link>
            {/* onPress={handleLogin}*/}
            {/* Signup */}
            <Text style={styles.signupText}>
                Don’t have an account?{" "}
                <Link href="/signup" asChild>
                    <TouchableOpacity onPress={() => router.push('/signup')}>
                        <Text style={styles.signupLink}>Signup</Text>
                    </TouchableOpacity>
                </Link>
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    carrot: { marginBottom: 100 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
    subtitle: { fontSize: 14, color: "gray", marginBottom: 20 },
    inputContainer: { width: "100%", marginBottom: 15 },
    label: { fontSize: 14, color: "gray", marginBottom: 5 },
    input: {
        width: "100%",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        backgroundColor: "#FFF",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "black",
        backgroundColor: "#FFF",
    },
    inputFlex: { flex: 1, padding: 10 },
    forgotPassword: { alignSelf: "flex-end", marginBottom: 20 },
    forgotPasswordText: { fontSize: 12, color: "black" },
    loginButton: {
        width: "100%",
        padding: 15,
        backgroundColor: "#53B175",
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 20,
    },
    loginButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
    signupText: { fontSize: 14, color: "black" },
    signupLink: { color: "#53B175", fontWeight: "bold" },
});
