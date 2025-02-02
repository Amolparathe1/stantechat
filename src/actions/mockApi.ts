import NetInfo from '@react-native-community/netinfo';
import { addToSyncQueue } from '../database/databaseSync';

// Mock data for successful API call
const mockSuccessData = {
    id: 101,
    name: 'Mocked Name',
    description: 'Mocked Description',
};

// Mock data for error scenario
const mockErrorData = {
    message: "Mock API Error"
}

export const mockApiCall = async (name: string, description: string) => {
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
        console.warn('No internet, saving data to sync queue');
        addToSyncQueue(name, description);
        return null;
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate network latency (adjust as needed)
            const shouldSimulateError = Math.random() < 0.2; // 20% chance of error

            if (shouldSimulateError) {
                // Simulate API error
                console.error('Mock API failed, adding to sync queue:');
                addToSyncQueue(name, description);
                resolve(mockErrorData); // Or reject if you want to handle errors differently
            } else {
                // Simulate API success
                console.log('Mock API call successful');
                resolve({ ...mockSuccessData, name, description }); // Include passed values
            }
        }, 500); // 500ms delay - adjust as needed
    });
};