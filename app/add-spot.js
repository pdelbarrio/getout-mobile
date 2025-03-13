import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddSpot() {
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