import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    { name: 'app_db.db', location: 'default' },
    () => console.log('Database connected'),
    (error) => console.error('Database error:', error)
);

// Initialize tables
export const initDatabase = () => {
    db.transaction((tx) => {
        // Main items table
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL
      );`,
            [],
            () => console.log('Items table ready'),
            (_, error) => console.error('Items table error:', error)
        );

        // Sync queue table (for storing unsynced data)
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS sync_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL
      );`,
            [],
            () => console.log('Sync queue table ready'),
            (_, error) => console.error('Sync queue table error:', error)
        );
    });
};

//  Add item to main database
export const addItemToDB = (name: string, description: string, callback: () => void) => {
    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO items (name, description) VALUES (?, ?);',
            [name, description],
            (_, result) => {
                console.log('Item added:', result.insertId);
                callback();
            },
            (_, error) => console.error('Insert item error:', error)
        );
    });
};

//  Fetch all items
export const getItemsFromDB = (callback: (items: any[]) => void) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM items;',
            [],
            (_, result) => callback(result.rows.raw()),
            (_, error) => console.error('Fetch items error:', error)
        );
    });
};

//  Update an item
export const updateItemInDB = (id: number, name: string, description: string, callback: () => void) => {
    db.transaction((tx) => {
        tx.executeSql(
            'UPDATE items SET name = ?, description = ? WHERE id = ?;',
            [name, description, id],
            () => {
                console.log(`Item ${id} updated`);
                callback();
            },
            (_, error) => console.error('Update item error:', error)
        );
    });
};

//  Delete an item
export const deleteItemFromDB = (id: number, callback: () => void) => {
    db.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM items WHERE id = ?;',
            [id],
            () => {
                console.log(`Item ${id} deleted`);
                callback();
            },
            (_, error) => console.error('Delete item error:', error)
        );
    });
};

// --- Sync Queue Operations ---

//  Add item to sync queue (for offline sync)
export const addToSyncQueue = (name: string, description: string) => {
    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO sync_queue (name, description) VALUES (?, ?);',
            [name, description],
            (_, result) => console.log('📥 Added to sync queue:', result.insertId),
            (_, error) => console.error('Sync queue insert error:', error)
        );
    });
};

//  Fetch all unsynced items
export const getSyncQueueItems = (callback: (items: any[]) => void) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM sync_queue;',
            [],
            (_, result) => callback(result.rows.raw()),
            (_, error) => console.error('Fetch sync queue error:', error)
        );
    });
};

//  Remove successfully synced items
export const removeFromSyncQueue = (id: number) => {
    db.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM sync_queue WHERE id = ?;',
            [id],
            () => console.log(`Synced item ${id} removed from queue`),
            (_, error) => console.error('Remove sync queue item error:', error)
        );
    });
};

