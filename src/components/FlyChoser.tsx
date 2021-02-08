import { Form } from "./Form/Form"
import { Paper, Box, makeStyles, Theme, createStyles, Divider, CircularProgress } from "@material-ui/core"
import { I_Airline, I_Airport } from "../types"
import React, { useState } from "react";
import c from 'clsx'
import { useFetchFligths } from "../useApi";
import { splitSolutions } from "../utils";
import { SolutionList } from "./List/SolutionList";
import { useSnackbar } from "../hooks/useSnackbar";

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
        },
        emptyLabel: {
            color: theme.palette.secondary.main,
            fontSize: '2rem'
        }
    })
);

export const FlyChoser: React.FC<I_FlyChoser> = ({ airports, airlines }) => {
    const classes = useStyles()

    const { show } = useSnackbar()
    const [submitted, setSubmitted] = useState(false)

    const { data, mutate, status, isLoading } = useFetchFligths({
        onError() {
            show({ severity: "error", text: "There was an error, please retry later", timeout: 3000 })
        }
    })
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
                {solutions.length > 0 && !isLoading && <SolutionList solutions={solutions} airports={airports} airlines={airlines} />}
                {isLoading && <Box display="flex" alignItems="center" justifyContent="center" flex="1" mt="2rem">
                    <CircularProgress color="secondary" />
                </Box>}
                {status === "success" && solutions.length === 0 && <Box display="flex" alignItems="center" justifyContent="center" flex="1" mt="2rem">
                    <span className={classes.emptyLabel}>No flights founded :(</span>
                </Box>}
            </Box>
        </Box>
    )
}