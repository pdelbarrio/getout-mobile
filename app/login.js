import React from 'react';
import { View, StyleSheet, Pressable, Alert, Linking } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '../lib/supabase';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    return (
        <ProtectedRoute authRequired={false}>
            <LoginContent />
        </ProtectedRoute>
    );
}



function LoginContent() {
    const router = useRouter();
    const { session } = useAuth();

    const handleEmailSignup = () => {
        router.push('/signup');
    };

    const handleEmailLogin = () => {
        router.navigate('email-login');
    };

    const handleForgotPassword = () => {
        router.push('/forgot-password');
    };

    const handleGooglePress = async () => {
        try {
            console.log('Starting Google auth...');
            const redirectUrl = 'exp://192.168.1.47:8081';

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: redirectUrl,
                    skipBrowserRedirect: true,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent'
                    }
                }
            });

            if (error) throw error;

            if (data?.url) {
                console.log('Opening auth URL in WebBrowser...');
                const result = await WebBrowser.openAuthSessionAsync(
                    data.url,
                    redirectUrl,
                    {
                        showInRecents: true,
                        createTask: true,
                        dismissButtonStyle: 'done'
                    }
                );

                console.log('WebBrowser result:', result);

                if (result.type === 'success') {
                    const { data: authData, error: authError } = await supabase.auth.exchangeCodeForSession(
                        result.url.split('code=')[1]
                    );

                    if (authError) throw authError;

                    if (authData.session) {
                        console.log('Session established successfully');
                        router.replace('/');
                    }
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to start Google Sign In');
            console.error('Google auth error:', error);
        }
    };

    // Remove local useEffect and use session from AuthContext
    if (session) {
        return null;
    }

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

            <Pressable
                style={styles.googleButton}
                onPress={handleGooglePress}
            >
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