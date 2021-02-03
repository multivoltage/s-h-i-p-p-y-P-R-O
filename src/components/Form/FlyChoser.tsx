import { Form } from "./Form"
import { Paper, Box, makeStyles, Theme, createStyles } from "@material-ui/core"
import { I_Airport } from "../../types"
import { useState } from "react";
import c from 'clsx'
import { useFetchFlifths } from "../../useApi";

interface I_FlyChoser {
    airports: I_Airport[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            // position: 'fixed',
            left: '50%',
            // transform: 'translateY(-50%)',
            maxWidth: 768,
            padding: '1rem',
            transition: 'transform 200ms linear'
        },
        containerUp: {
            top: 'initial',
            // transform: 'translate(-50%,0)'
        }
    })
);

export const FlyChoser: React.FC<I_FlyChoser> = ({ airports }) => {
    const classes = useStyles()
    const [submitted, setSubmitted] = useState(false)

    const { data, mutate, status } = useFetchFlifths()
    const containerClasses = c(classes.container, {
        [classes.containerUp]: submitted
    })


    function onSubmitForm(data: any) {
        const { from, to }: { from: I_Airport | undefined, to: I_Airport | undefined } = data
        if (!from || !to) { return }
        mutate({ from: from.codeIata, to: to.codeIata })

    }

    return (
        <Box ml="auto" mr="auto" className={containerClasses}>
            <Paper elevation={1}>
                <Box p="2rem">
                    <Form airports={airports} onSubmitForm={onSubmitForm} />
                </Box>
            </Paper>
        </Box>
    )
}