import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authSlice from '@/store/slices/authSlice';
import chatSlice from '@/store/slices/chatSlice';
import adSlice from '@/store/slices/adSlice';
import modalSlice from '@/store/slices/modalSlice';
import userSlice from '@/store/slices/userSlice';
import addressSlice from '@/store/slices/addressSlice';
import reviewSlice from '@/store/slices/reviewSlice';
import blockAndReportSlice from '@/store/slices/blockAndReportSlice';
import blockUserSlice from '@/store/slices/blockdUserSlice';
import transactionSlice from '@/store/slices/transactionSlice';

// Combine all reducers
const appReducer = combineReducers({
    auth: authSlice,
    chat: chatSlice,
    ad: adSlice,
    modal: modalSlice,
    user: userSlice,
    address: addressSlice,
    review: reviewSlice,
    blockAndReport: blockAndReportSlice,
    blockUser: blockUserSlice,
    transaction: transactionSlice
});

// Root reducer with RESET_STORE logic
const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        state = undefined; // Clear the entire state
    }
    return appReducer(state, action);
};

// Persist configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['chat'] // chat won't be persisted
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredPaths: ['chat.imagePreview'],
            },
        }),
});

// Create persistor
export const persistor = persistStore(store);

export default store;