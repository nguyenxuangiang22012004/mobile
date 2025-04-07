// app/forgot-password.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState<string>("");
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.carrot}>
                <FontAwesome5 name="carrot" size={70} color="orange" />
            </View>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Enter your email to reset your password</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <TouchableOpacity style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.backToLoginText}>
                    Back to <Text style={styles.loginLink}>Login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#F5F5F5" },
    carrot: { marginBottom: 100 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
    subtitle: { fontSize: 14, color: "gray", marginBottom: 20, textAlign: "center" },
    inputContainer: { width: "100%", marginBottom: 15 },
    label: { fontSize: 14, color: "gray", marginBottom: 5 },
    input: { width: "100%", padding: 10, borderBottomWidth: 1, borderBottomColor: "gray", backgroundColor: "#FFF" },
    resetButton: { width: "100%", padding: 15, backgroundColor: "#53B175", borderRadius: 25, alignItems: "center", marginBottom: 20 },
    resetButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
    backToLoginText: { fontSize: 14, color: "black" },
    loginLink: { color: "#53B175", fontWeight: "bold" },
});