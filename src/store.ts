import { createStore, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { reducer as snackbarReducer } from "./slice/snackbarSlice";

const rootReducer = combineReducers({
    snackbar: snackbarReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export default () => {
    let store = createStore(rootReducer);
    return store
};

export type RootState = ReturnType<typeof rootReducer>;
