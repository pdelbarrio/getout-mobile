import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Logout() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Logout Screen</Text>
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
    },
});

export default Logout;