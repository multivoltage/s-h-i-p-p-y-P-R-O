import { withStyles, Button, ButtonProps, CircularProgress } from "@material-ui/core";

export interface I_ButtonLoading extends ButtonProps {
    loading?: boolean;
}

export const ButtonLoading: React.FC<I_ButtonLoading> = (props) => <Button {...props}>
    <span>{props.children}</span>
    {props.loading && (
        <span>
            {props.variant === "contained" && (
                <CircularProgress size="1.3rem" color="inherit" />
            )}
        </span>
    )}
</Button>
