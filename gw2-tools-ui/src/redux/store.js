import { configureStore } from '@reduxjs/toolkit'
import apiKeyReducer from "./slices/apiKey";
import inventoryReducer from "./slices/inventory";
import loadingStateReducer from "./slices/loadingState";
import walletReducer from "./slices/wallet";
import bankReducer from "./slices/bank";
import itemRatesReducer from "./slices/itemRates";
import sharedInventoryReducer from "./slices/sharedInventory";
import materialsReducer from "./slices/materials";
import configReducer from "./slices/config";
import openingsReducer from "./slices/openings";
import {savingApiKeyMiddleware} from "./apiKeyMiddleware";

const apiKeyState = JSON.parse(localStorage.getItem("apiKey") || "null");

export const store = configureStore({
    preloadedState: {
        apiKey: {
            value: apiKeyState === null ? "" : apiKeyState
        }
    },
    reducer: {
        apiKey: apiKeyReducer,
        inventory: inventoryReducer,
        loadingState: loadingStateReducer,
        wallet: walletReducer,
        bank: bankReducer,
        materials: materialsReducer,
        config: configReducer,
        sharedInventory: sharedInventoryReducer,
        openings: openingsReducer,
        itemRates: itemRatesReducer
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        savingApiKeyMiddleware.middleware
    ]
})