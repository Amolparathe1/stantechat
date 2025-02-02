// src/redux/profileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
    name: string;
    email: string;
}

const initialState: ProfileState = {
    name: 'Amol',
    email: 'Amolparathe71@gmail.com',
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<ProfileState>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
    },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
