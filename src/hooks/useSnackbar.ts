import { AlertProps } from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { actions } from "../slice/snackbarSlice";

export interface I_SnakbarConfig {
    timeout?: number;
    text: string;
    severity: AlertProps["severity"];
}
export function useSnackbar() {
    const dispatch = useDispatch();

    const { config, open } = useSelector((state: RootState) => state.snackbar);
    function show(config: I_SnakbarConfig) {
        dispatch(actions.show(config));
    }

    function hide() {
        dispatch(actions.hide());
    }

    return {
        show,
        hide,
        open,
        config,
    };
}
