import { Form } from "./Form"
import { Paper, Box } from "@material-ui/core"
import { I_Airport } from "../../types"

interface I_FlyChoser {
    airports: I_Airport[]
}
export const FlyChoser: React.FC<I_FlyChoser> = ({ airports }) => {
    return (
        <Box maxWidth="768px" ml="auto" mr="auto" p="1rem">
            <Paper elevation={1}>
                <Box p="1rem">
                    <Form airports={airports} />
                </Box>
            </Paper>
        </Box>
    )
}