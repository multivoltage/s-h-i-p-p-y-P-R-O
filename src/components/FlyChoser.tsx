import { Form } from "./Form/Form"
import { Paper, Box, makeStyles, Theme, createStyles, Divider, CircularProgress } from "@material-ui/core"
import { I_Airline, I_Airport } from "../types"
import React, { useState } from "react";
import c from 'clsx'
import { useFetchFligths } from "../useApi";
import { splitSolutions } from "../utils";
import { SolutionList } from "./List/SolutionList";
import { Skeleton } from "@material-ui/lab";
import FlightIcon from '@material-ui/icons/Flight';

interface I_FlyChoser {
    airports: I_Airport[]
    airlines: I_Airline[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            flex: '1 0 auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 1024,
            padding: '1rem',
            transition: 'transform 200ms linear'
        },
        formContainer: {
            transition: 'transform ease-in-out 200ms',
            transform: 'translateY(calc(50vh - 120px - 75px))'
        },
        formContaineUp: {
            transform: 'initial'
        }
    })
);

export const FlyChoser: React.FC<I_FlyChoser> = ({ airports, airlines }) => {
    const classes = useStyles()
    const [submitted, setSubmitted] = useState(false)

    const { data, mutate, status, isLoading } = useFetchFligths()
    const formContainerClasses = c(classes.formContainer, {
        [classes.formContaineUp]: submitted
    })


    function onSubmitForm(data: any) {
        const { from, to }: { from: I_Airport | undefined, to: I_Airport | undefined } = data
        if (!from || !to) { return }
        mutate({ from: from.codeIata, to: to.codeIata })
        setSubmitted(true)
    }

    const list = data?.data.data || []
    const solutions = splitSolutions(list)

    return (
        <Box ml="auto" mr="auto" className={classes.container}>
            <Paper elevation={1} className={formContainerClasses}>
                <Box p="2rem">
                    <Form airports={airports} onSubmitForm={onSubmitForm} />
                </Box>
            </Paper>
            <Box mt="2rem" height="100%" flex="1 0 auto">
                {solutions.length > 0 && <SolutionList solutions={solutions} airports={airports} airlines={airlines} />}
                {isLoading && <Box display="flex" alignItems="center" justifyContent="center" flex="1">
                    <CircularProgress />
                </Box>}
            </Box>


        </Box>
    )
}