import { useForm, NestedValue } from "react-hook-form";
import { TextField, Grid, makeStyles, Theme, createStyles, MenuItem, Select } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { I_Airport } from "../../types";
import { ButtonLoading } from "../CustomElements";
import { useEffect } from "react";
interface I_Form {
    airports: I_Airport[]
    onSubmitForm: (data: any) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        submit: {
            height: '100%'
        },
        input: {
            fontSize: '3rem',
            color: 'red',
            '& .MuiFormHelperText-root': {
                position: 'absolute',
                bottom: -20
            }
        }
    })
);



export const Form: React.FC<I_Form> = ({ airports, onSubmitForm }) => {
    const classes = useStyles()
    const { register, handleSubmit, watch, setValue, errors, getValues, formState } = useForm<{
        from: I_Airport;
        to: I_Airport;
    }>({
        defaultValues: {
        },
    });
    const { from, to } = watch();

    const onSubmit = handleSubmit(onSubmitForm);

    useEffect(() => {
        register('from', {
            validate: (value) => {
                return !!value || 'Required.'
            },
        });
        register('to', {
            validate: (value) => {
                return !!value || 'Required.'
            },
        });
    }, [register]);


    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        fullWidth
                        onChange={(e, options) => setValue('from', options)}
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
                                label="From"
                                test-id="autocomplete-from"
                                variant="outlined"
                                error={Boolean(errors?.from)}
                                helperText={Boolean(errors?.from) ? "Required" : undefined}
                                inputProps={{
                                    ...params.inputProps,
                                }}
                                classes={{
                                    root: classes.input
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        fullWidth
                        options={airports.filter(f => !!from && f.codeIata !== from.codeIata)}
                        autoHighlight
                        onChange={(e, options) => setValue('to', options)}
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
                                label="To"
                                test-id="autocomplete-to"
                                error={Boolean(errors?.to)}
                                helperText={Boolean(errors?.to) ? "Required" : undefined}
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                }}
                                classes={{
                                    root: classes.input
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ButtonLoading fullWidth type="submit" disableElevation color="primary" variant="contained" className={classes.submit}>SEARCH</ButtonLoading>
                </Grid>
            </Grid>
        </form>
    );
}