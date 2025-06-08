import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ReceitaCard({ nome, tempoPreparo, fotoUri }) {
    return (
        <View style={styles.card}>
            {fotoUri && (
                <Image
                    source={{ uri: fotoUri }}
                    style={styles.foto}
                />
            )}
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.tempo}>{tempoPreparo} min</Text>
        </View>
    );
}

    const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    tempo: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
        color: '#000'
    },
    foto: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
},
});
