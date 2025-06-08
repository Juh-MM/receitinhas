import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function NewReceita() {
    const [nomeReceita, setNomeReceita] = useState('');
    const [tempoPreparo, settempoPreparo] = useState('');

    const [ingredienteInput, setIngredienteInput] = useState('');
    const [ingredientes, setIngredientes] = useState([]);

    const [modoInput, setModoInput] = useState('');
    const [modoPreparo, setModoPreparo] = useState([]);

    const [fotoUri, setFotoUri] = useState(null);

    // Adicionar ingrediente
    const handleAddIngrediente = () => {
        if (ingredienteInput.trim() !== '') {
        setIngredientes([...ingredientes, ingredienteInput]);
        setIngredienteInput('');
        }
    };

    // Adicionar modo de preparo
    const handleAddModoPreparo = () => {
        if (modoInput.trim() !== '') {
        setModoPreparo([...modoPreparo, modoInput]);
        setModoInput('');
        }
    };

const handleTirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        alert('Permissão para acessar a câmera foi negada.');
        return;
    }
    const result = await ImagePicker.launchCameraAsync({
        quality: 0.5,
        base64: false,
    });
    if (!result.canceled) {
        const uri = result.assets[0].uri;
        setFotoUri(uri);

        try {
            await AsyncStorage.setItem('fotoUri', uri);
            console.log('Foto URI salva com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar a URI da foto:', error);
        }
    }
};

useEffect(() => {
    const carregarFotoSalva = async () => {
        try {
            const uriSalva = await AsyncStorage.getItem('fotoUri');
            if (uriSalva !== null) {
                setFotoUri(uriSalva);
            }
        } catch (error) {
            console.error('Erro ao carregar a foto URI:', error);
        }
    };
    carregarFotoSalva();
}, []);

    const handleSalvarReceita = async () => {
    const receita = {
        nome: nomeReceita,
        tempoPreparo: tempoPreparo,
        ingredientes: ingredientes,
        modoPreparo: modoPreparo,
    };

    try {
        const response = await fetch('https://receitinhas-api.onrender.com/receitas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(receita),
        });

        if (response.ok) {
        alert('Receita salva com sucesso!');
        // Aqui você pode navegar de volta ou limpar os campos
        } else {
        alert('Erro ao salvar a receita.');
        }
    } catch (error) {
        console.error(error);
        alert('Erro de conexão com o servidor.');
    }
};


    return (
        <View style={{ padding: 20 }}>

        <TouchableOpacity style={styles.fotoButton} onPress={handleTirarFoto}>
            <Text style={styles.fotoButtonText}>Tirar Foto</Text>
        </TouchableOpacity>

        {/* Pré-visualização da foto */}
        {fotoUri && (
            <Image source={{ uri: fotoUri }} style={styles.fotoPreview} />
        )}

        <View style={styles.section}>
            <Text>Nome da Receita:</Text>
            <TextInput
            value={nomeReceita}
            onChangeText={setNomeReceita}
            placeholder="Digite o nome"
            style={styles.input}
            />

            <Text>Tempo de Preparo:</Text>
            <TextInput
            value={tempoPreparo}
            onChangeText={settempoPreparo}
            placeholder="Ex: 30 minutos"
            style={styles.input}
            />
        </View>

        {/* Ingredientes */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredientes:</Text>
            <View style={styles.row}>
            <TextInput
                value={ingredienteInput}
                onChangeText={setIngredienteInput}
                placeholder="Digite o ingrediente"
                style={styles.input}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddIngrediente}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            </View>
            <FlatList
            data={ingredientes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.listItem}>• {item}</Text>}
            />
        </View>

        {/* Modo de Preparo */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Modo de Preparo:</Text>
            <View style={styles.row}>
            <TextInput
                value={modoInput}
                onChangeText={setModoInput}
                placeholder="Digite o passo"
                style={styles.input}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddModoPreparo}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            </View>
            <FlatList
            data={modoPreparo}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.listItem}>• {item}</Text>}
            />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSalvarReceita}>
            <Text style={styles.saveButtonText}>Salvar Receita</Text>
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginRight: 10,
        color: 'black',
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    listItem: {
        paddingVertical: 4,
    },
    saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    },
    saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
},fotoButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
},
fotoButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
},
fotoPreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
},
    });
