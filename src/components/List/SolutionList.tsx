import { Box, createStyles, makeStyles, Paper, Theme, Fade } from "@material-ui/core"
import { I_Airline, I_Airport, I_Flight } from "../../types"
import { SolutionContainer } from "./SolutionContainer";

interface I_SolutionList {
    solutions: I_Flight[][]
    airports: I_Airport[]
    airlines: I_Airline[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: {
            margin: '.5rem 0',
            padding: '1rem'
        }
    })
);

export const SolutionList: React.FC<I_SolutionList> = ({ solutions, airports, airlines }) => {
    const classes = useStyles()

    return <Box>
        {solutions.map((flights, index) => {
            const key = flights.map(f => f.id).join()
            return (
                <Fade key={key} in={true} timeout={200 + (200 * index)}>
                    <Paper elevation={1} className={classes.row}>
                        <SolutionContainer airports={airports} flights={flights} airlines={airlines} />
                    </Paper>
                </Fade>
            )
        })}
    </Box>
}