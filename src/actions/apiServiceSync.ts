import NetInfo from '@react-native-community/netinfo';
import { getSyncQueueItems, removeFromSyncQueue } from '../database/databaseSync';
import { mockApiCall } from './mockApi';

export const syncOfflineData = async () => {
    const netState = await NetInfo.fetch();

    if (netState.isConnected) {
        getSyncQueueItems(async (items) => {
            for (let item of items) {
                try {
                    const response = await mockApiCall(item.name, item.description);

                    if (response) {
                        console.log(`Synced to API: ${response?.id}`);
                        removeFromSyncQueue(item.id); //  DELETE from SQLite after successful API call
                    }
                } catch (error) {
                    console.error(`Sync failed for item ${item.id}:`, error);
                }
            }
        });
    }
};
