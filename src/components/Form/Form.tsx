import { useForm } from "react-hook-form";
import { TextField, Grid, makeStyles, Theme, createStyles } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { I_Airport } from "../../types";
import { ButtonLoading } from "../CustomElements";
import classes from "*.module.css";
interface I_Form {
    airports: I_Airport[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        submit: {
            height: '100%'
        },
    })
);

export const Form: React.FC<I_Form> = ({ airports }) => {
    const classes = useStyles()
    const { register, handleSubmit, watch, errors, reset } = useForm();
    const onSubmit = (data: any) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <Autocomplete
                        fullWidth
                        innerRef={register}
                        options={airports}
                        autoHighlight
                        getOptionLabel={(option) => option.codeIata}
                        renderOption={(option) => (
                            <>
                                {option.codeIata}
                            </>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                innerRef={register}
                                name="origin"
                                label="From"
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Autocomplete
                        fullWidth
                        innerRef={register}
                        options={airports}
                        autoHighlight
                        getOptionLabel={(option) => option.codeIata}
                        renderOption={(option) => (
                            <>
                                {option.codeIata}
                            </>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                innerRef={register}
                                name="destination"
                                label="To"
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}>
                    <ButtonLoading fullWidth disableElevation color="primary" variant="contained" className={classes.submit}>SEARCH</ButtonLoading>
                </Grid>
            </Grid>
        </form>
    );
}