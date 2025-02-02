import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../type/types';
import { getItems, insertItem, updateItem, deleteItem } from '../database/databaseCURD';

interface ItemState {
    data: Item[];
    loading: boolean;
}

// Initial State
const initialState: ItemState = {
    data: [],
    loading: false,
};

// Async Thunks
export const fetchItems = createAsyncThunk('items/fetchItems', async (): Promise<Item[]> => {
    return new Promise(resolve => getItems(resolve));
});

export const addItem = createAsyncThunk('items/addItem', async (item: Item, { dispatch }) => {
    return new Promise<void>(resolve => {
        insertItem(item.name, item.description, () => {
            dispatch(fetchItems());
            resolve();
        });
    });
});

export const editItem = createAsyncThunk('items/editItem', async (item: Item, { dispatch }) => {
    return new Promise<void>(resolve => {
        updateItem(item.id!, item.name, item.description, () => {
            dispatch(fetchItems());
            resolve();
        });
    });
});

export const removeItem = createAsyncThunk('items/removeItem', async (id: number, { dispatch }) => {
    return new Promise<void>(resolve => {
        deleteItem(id, () => {
            dispatch(fetchItems());
            resolve();
        });
    });
});

// Slice
const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchItems.pending, state => { state.loading = true; });
    }
});

export default itemSlice.reducer;
