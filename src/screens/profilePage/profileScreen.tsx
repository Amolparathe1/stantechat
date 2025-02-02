// src/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, ToastAndroid, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/profileSlice';
import { RootState, AppDispatch } from '../../redux/store';
import styles from './styles/profileScreenStyles';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    const profile = useSelector((state: RootState) => state.profile);

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);

    const handleSave = () => {
        dispatch(updateProfile({ name, email }));
        if (Platform.OS === 'android') {
            ToastAndroid.show("Profile Updated", ToastAndroid.SHORT);
        } else {
            Alert.alert("Success", "Profile Updated");
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Button title="Save Profile" onPress={handleSave} />
        </View>
    );
};

export default ProfileScreen;
