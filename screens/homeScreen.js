import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonCreate from '../components/buttonCreate';
import ReceitaCard from '../components/receitaCard';

export default function HomeScreen() {
    const [receitas, setReceitas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarReceitas = async () => {
        try {
            setLoading(true);

            // Buscar receitas da API
            const response = await fetch('https://receitinhas-api.onrender.com/receitas');
            const apiReceitas = await response.json();

            // Buscar receitas locais no AsyncStorage
            const receitasLocais = await AsyncStorage.getItem('receitas');
            const receitasLocaisParsed = receitasLocais ? JSON.parse(receitasLocais) : [];

            // Combinar listas (você pode ajustar a lógica se preferir exibir apenas locais ou apenas da API)
            const listaCompleta = [...receitasLocaisParsed, ...apiReceitas];

            setReceitas(listaCompleta);
        } catch (error) {
            console.error('Erro ao carregar receitas:', error);
        } finally {
            setLoading(false);
        }
        };

        carregarReceitas();
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
        keyExtractor={(item, index) =>
            item._id ? item._id.toString() : index.toString()
        }
        renderItem={({ item }) => (
            <ReceitaCard
            nome={item.nome}
            tempoPreparo={item.tempoPreparo}
            fotoUri={item.fotoUri}
            />
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
        alignItems: 'center',
        marginVertical: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});
