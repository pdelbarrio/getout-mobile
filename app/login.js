import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { testSupabaseConnection } from '../lib/testSupabase';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Login() {
    // Wrap the existing content with ProtectedRoute
    return (
        <ProtectedRoute authRequired={false}>
            <LoginContent />
        </ProtectedRoute>
    );
}

function LoginContent() {
    const router = useRouter();

    const handleEmailSignup = () => {
        router.push('/signup');
    };

    const handleEmailLogin = () => {
        console.log("Attempting navigation to email-login");
        try {
            router.navigate('email-login');  // Using navigate instead
            console.log("Navigation command executed");
        } catch (error) {
            console.error("Navigation error:", error);
        }
    };

    const handleForgotPassword = () => {
        router.push('/forgot-password');
    };

    useEffect(() => {
        testSupabaseConnection();
    }, []);

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Welcome to GetOutBCN</Text>

            <Button
                title="Sign Up with Email"
                buttonStyle={styles.emailButton}
                containerStyle={styles.buttonContainer}
                onPress={handleEmailSignup}
            />

            <Button
                title="Login with Email"
                buttonStyle={styles.emailButton}
                containerStyle={styles.buttonContainer}
                onPress={handleEmailLogin}
            />

            <Pressable onPress={handleForgotPassword}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </Pressable>

            <View style={styles.divider}>
                <Text style={styles.dividerText}>or</Text>
            </View>

            <Pressable style={styles.googleButton}>
                <Ionicons name="logo-google" size={24} color="white" style={styles.icon} />
                <Text style={styles.buttonText}>Continue with Google</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        color: '#FFFFFF',
        marginBottom: 40,
    },
    buttonContainer: {
        width: '80%',
        marginVertical: 10,
    },
    emailButton: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 8,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4285F4',
        padding: 15,
        borderRadius: 8,
        width: '80%',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginVertical: 20,
    },
    dividerText: {
        color: '#666',
        paddingHorizontal: 10,
    },
    forgotPassword: {
        color: '#4285F4',
        marginTop: 10,
    }
});