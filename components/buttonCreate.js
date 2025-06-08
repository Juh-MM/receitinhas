import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ButtonCreate() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('NewReceita')}>
            <Ionicons name="add" size={24} color="white" style={styles.icon} />
            <Text style={styles.text}>Criar uma nova receita</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    icon: {
        marginRight: 8,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
