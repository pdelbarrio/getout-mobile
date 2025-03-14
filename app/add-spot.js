import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { useCallback } from 'react';

export default function AddSpot() {
    const { session } = useAuth();
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            if (!session) {
                router.replace('/login');
            }
        }, [session])
    );

    if (!session) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add Spot Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
    }
});