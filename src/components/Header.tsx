import Image from 'next/image'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            textAlign: 'center'
        },
    })
);

export const Header = () => {
    const classes = useStyles()

    return (
        <header className={classes.header}>
            <Image priority src="/logo.svg" alt="Site logo" width={200} height={70} />
        </header>
    );
}
