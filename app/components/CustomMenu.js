import React from 'react';
import { View, Pressable, StyleSheet, Animated, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function CustomMenu({ isVisible, onClose }) {
    const router = useRouter();
    const slideAnim = React.useRef(new Animated.Value(width)).current;

    React.useEffect(() => {
        if (isVisible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 50,
                friction: 7
            }).start();
        } else {
            Animated.spring(slideAnim, {
                toValue: width,
                useNativeDriver: true,
                tension: 50,
                friction: 7
            }).start();
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <Pressable
                style={[styles.backdrop, { display: isVisible ? 'flex' : 'none' }]}
                onPress={onClose}
            />
            <Animated.View
                style={[
                    styles.menuContainer,
                    {
                        transform: [{ translateX: slideAnim }]
                    }
                ]}
            >
                <View style={styles.menuHeader}>
                    <Text style={styles.menuTitle}>Menu</Text>
                    <Pressable onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeText}>✕</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.menuItem} onPress={() => navigateTo('/')}>
                    <Text style={styles.menuText}>Home</Text>
                </Pressable>
                <Pressable style={styles.menuItem} onPress={() => navigateTo('/login')}>
                    <Text style={styles.menuText}>Login</Text>
                </Pressable>
                <Pressable style={styles.menuItem} onPress={() => navigateTo('/logout')}>
                    <Text style={styles.menuText}>Logout</Text>
                </Pressable>
                <Pressable style={styles.menuItem} onPress={() => navigateTo('/add-spot')}>
                    <Text style={styles.menuText}>Add Spot</Text>
                </Pressable>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
    },
    menuContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '70%',
        height: '100%',
        backgroundColor: '#1E1E1E',
        padding: 20,
        paddingTop: 20,
        zIndex: 1001,
    },
    menuHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    menuTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 8,
    },
    closeText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    menuItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    menuText: {
        color: '#FFFFFF',
        fontSize: 18,
    }
});