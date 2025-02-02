import SQLite from 'react-native-sqlite-storage';
import { Item } from '../type/types';

const db = SQLite.openDatabase(
    { name: 'items.db', location: 'default' },
    () => console.log('Database opened'),
    error => console.error('Database error:', error)
);

// Create Table
export const createTable = (): void => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT);`,
            [],
            () => console.log('Table created'),
            error => console.error('Table creation error:', error)
        );
    });
};

// Fetch Items
export const getItems = (callback: (items: Item[]) => void): void => {
    db.transaction(tx => {
        tx.executeSql(
            `SELECT * FROM items;`,
            [],
            (_, results) => callback(results.rows.raw()),
            error => console.error('Fetch error:', error)
        );
    });
};

// Insert Item
export const insertItem = (name: string, description: string, callback: () => void): void => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO items (name, description) VALUES (?, ?);`,
            [name, description],
            () => callback(),
            error => console.error('Insert error:', error)
        );
    });
};

// Update Item
export const updateItem = (id: number, name: string, description: string, callback: () => void): void => {
    db.transaction(tx => {
        tx.executeSql(
            `UPDATE items SET name=?, description=? WHERE id=?;`,
            [name, description, id],
            () => callback(),
            error => console.error('Update error:', error)
        );
    });
};

// Delete Item
export const deleteItem = (id: number, callback: () => void): void => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM items WHERE id=?;`,
            [id],
            () => callback(),
            error => console.error('Delete error:', error)
        );
    });
};

export default db;
