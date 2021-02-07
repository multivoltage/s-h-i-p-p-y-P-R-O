import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { I_SnakbarConfig } from "../hooks/useSnackbar";

interface I_SnackbarState {
    config: I_SnakbarConfig;
    open: boolean;
}
const snackbar = createSlice({
    name: "snackbar",
    initialState: {
        open: false,
        config: {
            timeout: 1500,
            text: "",
            severity: "info",
        },
    } as I_SnackbarState,
    reducers: {
        show: (state, action: PayloadAction<I_SnakbarConfig>) => {
            state.config = action.payload;
            state.open = true;
        },
        hide: (state) => {
            state.open = false;
        },
    },
});

export const { actions, reducer } = snackbar;
