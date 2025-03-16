import React, { useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, Image
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.carot}>
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
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            {/* Signup */}
            <Text style={styles.signupText}>
                Don’t have an account? <Text style={styles.signupLink}>Signup</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: "gray",
        marginBottom: 5,
    },
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
    inputFlex: {
        flex: 1,
        padding: 10,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    carot: {
        marginBottom: 100
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
        marginBottom: 20,
    },

    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },
    forgotPasswordText: {
        fontSize: 12,
        color: "black",
    },
    loginButton: {
        width: "100%",
        padding: 15,
        backgroundColor: "#53B175",
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 20,
    },
    loginButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    signupText: {
        fontSize: 14,
        color: "black",
    },
    signupLink: {
        color: "#53B175",
        fontWeight: "bold",
    },
});
