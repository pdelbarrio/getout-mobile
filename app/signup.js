import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            setLoading(true);

            // Create auth user
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });

            if (error) {
                console.error('Auth Error:', error);
                throw error;
            }

            console.log('Auth Success:', data);

            // Create profile entry
            if (data?.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: data.user.id,
                        email: data.user.email
                    });

                if (profileError) {
                    console.error('Profile Error:', profileError);
                    throw profileError;
                }
            }

            Alert.alert(
                'Success',
                'Account created successfully!',
                [{ text: 'OK', onPress: () => router.push('/') }]
            );

        } catch (error) {
            console.error('Error:', error.message);
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Create Account</Text>

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

            <Input
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                inputStyle={styles.input}
                placeholderTextColor="#666"
            />

            <Button
                title="Sign Up"
                loading={loading}
                buttonStyle={styles.signupButton}
                containerStyle={styles.buttonContainer}
                onPress={handleSignup}
            />

            <Button
                title="Back to Login"
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
    signupButton: {
        backgroundColor: '#4285F4',
        padding: 15,
        borderRadius: 8,
    },
    backButton: {
        color: '#4285F4',
    }
});