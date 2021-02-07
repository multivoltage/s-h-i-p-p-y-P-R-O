import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { useSnackbar } from "../hooks/useSnackbar";

export function GlobalSnackbar() {
    const { hide, open, config } = useSnackbar();
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        hide();
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={config.timeout || 1500}
            onClose={handleClose}
            test-id="globalSnackbar"
        >
            <Alert onClose={handleClose} severity={config.severity || "info"}>
                {config.text}
            </Alert>
        </Snackbar>
    );
}
