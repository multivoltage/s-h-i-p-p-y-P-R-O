import Image from 'next/image'
import { makeStyles, Theme, createStyles, Switch, Box } from '@material-ui/core'
import NightsStayIcon from '@material-ui/icons/NightsStay';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            textAlign: 'center',
            position: 'relative'
        },
        switchContainer: {
            position: 'absolute',
            right: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)'
        }
    })
);

interface I_header {
    theme: "dark" | "light"
    handleToggleTheme: () => void
}
export const Header: React.FC<I_header> = ({ theme, handleToggleTheme }) => {
    const classes = useStyles()
    const checked = theme === "light"
    function handleChange() {
        handleToggleTheme()
    };
    return (
        <header className={classes.header}>
            <Image priority src="/logo.svg" alt="Site logo" width={200} height={70} />
            <Box className={classes.switchContainer} display="flex" alignItems="center">
                {!checked && <NightsStayIcon fontSize="small" />}
                {checked && <WbSunnyIcon fontSize="small" />}
                <Switch
                    size="small"
                    color="primary"
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'dark mode' }}
                />
            </Box>

        </header>
    );
}
