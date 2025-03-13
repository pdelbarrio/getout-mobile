import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { useRouter } from 'expo-router';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSignup = async () => {
        // We'll implement Supabase signup here
        console.log('Signup pressed', email, password);
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
    },
});