import NetInfo from '@react-native-community/netinfo';
import { addToSyncQueue } from '../database/databaseSync';

export const mockApiCall = async (name: string, description: string) => {
    const netState = await NetInfo.fetch();

    if (!netState.isConnected) {
        console.warn('No internet, saving data to sync queue');
        addToSyncQueue(name, description);
        return null;
    }

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('API request failed');

        return await response.json();
    } catch (error) {
        console.error('API failed, adding to sync queue:', error);
        addToSyncQueue(name, description);
        return null;
    }
};
