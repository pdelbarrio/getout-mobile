import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Input, CheckBox } from 'react-native-elements';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import ProtectedRoute from '../components/ProtectedRoute';

export default function EmailLogin() {
    return (
        <ProtectedRoute authRequired={false}>
            <EmailLoginContent />
        </ProtectedRoute>
    );
}

function EmailLoginContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
                options: {
                    persistSession: rememberMe
                }
            });

            if (error) throw error;
            router.replace('/');

        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Login</Text>

            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                inputStyle={styles.input}
                placeholderTextColor="#666"
            />

            <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                inputStyle={styles.input}
                placeholderTextColor="#666"
            />

            <CheckBox
                title="Remember Me"
                checked={rememberMe}
                onPress={() => setRememberMe(!rememberMe)}
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxText}
                checkedColor="#4285F4"
            />

            <Button
                title="Login"
                loading={loading}
                buttonStyle={styles.loginButton}
                containerStyle={styles.buttonContainer}
                onPress={handleLogin}
            />

            <Button
                title="Back"
                type="clear"
                titleStyle={styles.backButton}
                onPress={() => router.back()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    title: {
        color: '#FFFFFF',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        color: '#FFFFFF',
    },
    buttonContainer: {
        width: '100%',
        marginVertical: 10,
    },
    loginButton: {
        backgroundColor: '#4285F4',
        padding: 15,
        borderRadius: 8,
    },
    backButton: {
        color: '#4285F4',
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        marginLeft: 0,
        marginBottom: 20,
    },
    checkboxText: {
        color: '#FFFFFF',
        fontWeight: 'normal',
    }
});