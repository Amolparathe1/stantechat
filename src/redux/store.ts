import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './itemSlice';
import profileReducer from './profileSlice';

const store = configureStore({
    reducer: {
        items: itemReducer,
        profile: profileReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
