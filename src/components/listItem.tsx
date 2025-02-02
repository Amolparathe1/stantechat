import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles/listItemStyles';

const ListItem: React.FC<{
    item: { id: number; name: string; description: string };
    onEdit: () => void;
    onDelete: () => void;
}> = ({ item, onEdit, onDelete }) => (
    <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    </View>
);

export default ListItem;