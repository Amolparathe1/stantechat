import React, { useEffect } from 'react';
import { View, FlatList, Text, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, removeItem } from '../../redux/itemSlice';
import { RootState, AppDispatch } from '../../redux/store';
import ListItem from '../../components/listItem';
import styles from './styles/homeScreenStyles';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading } = useSelector((state: RootState) => state.items);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Item List</Text>

            {loading && <Text style={styles.loadingText}>Loading...</Text>}

            <FlatList
                data={data}
                keyExtractor={(item) => item.id!.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        item={item}
                        onEdit={() => navigation.navigate('AddEdit', { item })}
                        onDelete={() => dispatch(removeItem(item.id!))}
                    />
                )}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddEdit')}>
                    <Text style={styles.buttonText}>➕ Add New Item</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.profileButton]} onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.buttonText}>👤 Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;
