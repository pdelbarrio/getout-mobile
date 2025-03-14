import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
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
    const router = useRouter();

    const handleLogin = async () => {
        console.log('Login attempt with:', { email }); // Debug log
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            console.log('Login successful:', data); // Debug log
            router.replace('/');

        } catch (error) {
            console.error('Login error:', error); // Debug log
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
    }
});