// Remove the comment lines from JSX and fix imports
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Input, Button, DropDownPicker } from 'react-native-elements';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

const CATEGORIES = [
    'Live Music', 'Food', 'Shops', 'Stand Up',
    'Cinema', 'Views', 'Silence', 'Weird'
];

const DISTRICTS = [
    'Ciutat Vella', 'Eixample', 'Sants-Montjuïc',
    'Les Corts', 'Sarrià-Sant Gervasi', 'Gràcia',
    'Horta-Guinardó', 'Nou Barris', 'Sant Andreu', 'Sant Martí'
];

export default function AddSpot() {
    return (
        <ProtectedRoute authRequired={true}>
            <AddSpotContent />
        </ProtectedRoute>
    );
}

function AddSpotContent() {
    const { session } = useAuth();
    const router = useRouter();
    const [spotData, setSpotData] = useState({
        name: '',
        description: '',
        website: '',
        category: '',
        district: '',
        location: ''
    });

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('spots')
                .insert([{
                    ...spotData,
                    created_by: session.user.id
                }])
                .select();

            if (error) throw error;
            router.back();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.label}>Place Name</Text>
                <Input
                    placeholder="Enter place name"
                    placeholderTextColor="#666"
                    value={spotData.name}
                    onChangeText={(text) => setSpotData({ ...spotData, name: text })}
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                />

                <Text style={styles.label}>Upload Photo</Text>
                <TouchableOpacity style={styles.uploadButton}>
                    <Ionicons name="cloud-upload-outline" size={24} color="white" />
                    <Text style={styles.uploadText}>Click to upload or drag and drop</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Description</Text>
                <Input
                    placeholder="Describe this place"
                    placeholderTextColor="#666"
                    multiline
                    numberOfLines={4}
                    value={spotData.description}
                    onChangeText={(text) => setSpotData({ ...spotData, description: text })}
                    inputStyle={[styles.input, styles.textArea]}
                    containerStyle={styles.inputContainer}
                />

                <Text style={styles.label}>Website (Optional)</Text>
                <Input
                    placeholder="https://example.com"
                    placeholderTextColor="#666"
                    value={spotData.website}
                    onChangeText={(text) => setSpotData({ ...spotData, website: text })}
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                />

                // Replace the Category and District sections
                // In the render section, remove the comments and fix the Category/District sections:
                <Text style={styles.label}>Category</Text>
                <Input
                    placeholder="Select a category"
                    placeholderTextColor="#666"
                    value={spotData.category}
                    disabled
                    rightIcon={
                        <TouchableOpacity onPress={() => {/* Show category picker modal */ }}>
                            <Ionicons name="chevron-down" size={24} color="white" />
                        </TouchableOpacity>
                    }
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                />

                <Text style={styles.label}>District</Text>
                <Input
                    placeholder="Select a district"
                    placeholderTextColor="#666"
                    value={spotData.district}
                    disabled
                    rightIcon={
                        <TouchableOpacity onPress={() => {/* Show district picker modal */ }}>
                            <Ionicons name="chevron-down" size={24} color="white" />
                        </TouchableOpacity>
                    }
                    inputStyle={styles.input}
                    containerStyle={styles.inputContainer}
                />
                <Button
                    title="Get My Current Location"
                    onPress={() => {/* Location logic will be implemented */ }}
                    buttonStyle={styles.locationButton}
                    containerStyle={styles.buttonContainer}
                />

                <Button
                    title="Submit"
                    onPress={handleSubmit}
                    buttonStyle={styles.submitButton}
                    containerStyle={styles.buttonContainer}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    content: {
        padding: 20,
    },
    label: {
        color: 'white',
        fontSize: 16,
        marginBottom: 8,
        marginLeft: 10,
    },
    inputContainer: {
        paddingHorizontal: 0,
        marginBottom: 20,
    },
    input: {
        color: 'white',
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    uploadButton: {
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    uploadText: {
        color: 'white',
        marginTop: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        marginBottom: 20,
    },
    picker: {
        color: 'white',
    },
    locationButton: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 8,
    },
    submitButton: {
        backgroundColor: '#4285F4',
        padding: 15,
        borderRadius: 8,
    },
    buttonContainer: {
        marginBottom: 15,
    },
});