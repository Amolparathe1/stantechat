import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles/inputFieldStyles';

interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    multiline?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText, multiline = false }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, multiline && styles.textArea]}
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
            />
        </View>
    );
};

export default InputField;
