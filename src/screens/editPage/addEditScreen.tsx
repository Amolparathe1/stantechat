import React, { useState, useMemo } from 'react';
import { View, Button, Alert } from 'react-native';
import { useDispatch, useStore } from 'react-redux';
import { addItem, editItem } from '../../redux/itemSlice';
import { AppDispatch } from '../../redux/store';
import { Item } from '../../type/types';
import InputField from '../../components/inputField';
import styles from './styles/addEditScreenStyles';

const AddEditScreen = ({ navigation, route }) => {
    const dispatch = useDispatch<AppDispatch>();
    const store = useStore().getState();
    console.log('store: ', store);

    // Memoized item retrieval for optimization
    const item: Item | undefined = useMemo(() => route.params?.item, [route.params]);

    // Local state for input fields
    const [name, setName] = useState(item?.name || '');
    const [description, setDescription] = useState(item?.description || '');

    // Save function with validation
    const handleSave = () => {
        if (name.trim() === '' || description.trim() === '') {
            Alert.alert('Validation Error', 'Both fields are required.');
            return;
        }
        if (item) {
            dispatch(editItem({ id: item.id, name, description }));
        } else {
            dispatch(addItem({ name, description }));
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <InputField label="Name" value={name} onChangeText={setName} />
            <InputField label="Description" value={description} onChangeText={setDescription} multiline />
            <Button title="Save" onPress={handleSave} />
        </View>
    );
};

export default AddEditScreen;
