import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-elements';

const categories = [
    { id: 1, name: 'Live Music' },
    { id: 2, name: 'Food' },
    { id: 3, name: 'Shops' },
    { id: 4, name: 'Stand Up' },
    { id: 5, name: 'Cinema' },
    { id: 6, name: 'Views' },
    { id: 7, name: 'Silence' },
    { id: 8, name: 'Weird' },
];

function Index() {  // Changed from Home to Index
    return (
        <ScrollView style={styles.container}>
            <View style={styles.grid}>
                {categories.map((category) => (
                    <Card key={category.id} containerStyle={styles.card}>
                        <View style={styles.categoryContent}>
                            <Text style={styles.categoryName}>{category.name}</Text>
                        </View>
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    grid: {
        padding: 8,
    },
    card: {
        width: '95%',
        marginBottom: 10,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: '#1E1E1E',
        borderColor: '#333333',
    },
    categoryContent: {
        padding: 15,
    },
    categoryName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default Index;  // Make sure to export Index