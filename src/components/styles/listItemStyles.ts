import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 12,
    },
    editButton: {
        backgroundColor: '#007BFF',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: '#DC3545',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});