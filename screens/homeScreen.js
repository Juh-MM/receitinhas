import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import ButtonCreate from '../components/buttonCreate';
import ReceitaCard from '../components/receitaCard';

export default function HomeScreen() {

const [receitas, setReceitas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReceitas = async () => {
        try {
            const response = await fetch('https://receitinhas-api.onrender.com/receitas'); 
            const data = await response.json();
            setReceitas(data);
        } catch (error) {
            console.error('Erro ao buscar receitas:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchReceitas();
    }, []);

    if (loading) {
        return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="#007AFF" />
        </View>
        );
    }

    return (
    <FlatList
        data={receitas}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
        <ReceitaCard nome={item.nome} tempo={item.tempo} />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
        <View style={styles.container}>
            <ButtonCreate />
        </View>
        }
    />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})