import { Box, createStyles, Divider, Grid, makeStyles, Theme, IconButton, Fade, Collapse } from "@material-ui/core"
import React, { useMemo, useState } from "react"
import { IntlNumber, getMediumPoint } from "../../utils"
import FlightIcon from '@material-ui/icons/Flight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MapContainer from "./googlemap";
import { I_MapPoint } from "../../types";

export interface I_Solution {
    airports: string[]
    airlines: string[]
    totalPrice: number
    prices: number[]
    mapsPoints: I_MapPoint[]

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: 200
        },
        labelBig: {
            fontWeight: 'bold',
            fontSize: '1.3rem'
        },
        arrowRight: {
            transform: 'rotate(90deg)'
        },
        itemIntermediate: {
            display: 'flex',
            alignItems: 'center'
        },
        subprice: {
            width: 100,
            textAlign: 'right',
            display: 'inline-block'
        }
    })
);

// used only for view
export const Solution: React.FC<I_Solution> = ({ airports, airlines, totalPrice, prices, mapsPoints }) => {
    const classes = useStyles()
    const origin = airports[0]
    const destination = airports[airports.length - 1]
    const intermediates = airports.length > 2 ? [...airports].splice(1, airports.length - 2) : []
    const stopovers = airports.length - 2

    const [expanded, setExpanded] = useState(false)


    const handleClickExpanded = useMemo(() => function () {
        setExpanded(!expanded)
    }, [expanded])

    const centerPoint = useMemo(() => getMediumPoint(mapsPoints), [])

    return (
        <Grid container spacing={2} alignItems="center" justify="space-between" test-id="row-solution">
            <Grid item xs={12} md={7}>
                <Grid container spacing={1} alignItems="center" justify="center">
                    <Grid item className={classes.labelBig}>{origin}</Grid>
                    {intermediates.length > 0 && <>
                        {intermediates.map(airport =>
                            <Grid item className={classes.itemIntermediate} key={airport}>
                                <FlightIcon color="secondary" className={classes.arrowRight} fontSize="small" />
                                <span>{airport}</span>
                            </Grid>
                        )}
                        <FlightIcon color="secondary" className={classes.arrowRight} />
                    </>}
                    {intermediates.length === 0 && <FlightIcon color="secondary" className={classes.arrowRight} fontSize="small" />}
                    <Grid item className={classes.labelBig}>{destination}</Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} md={2} style={{ textAlign: 'center' }}>
                <Box display="flex" alignItems="center" justifyContent="center">
                    {stopovers === 0 && <span className={classes.labelBig}>DIRECT</span>}
                    {stopovers > 0 &&
                        <>
                            <span className={classes.labelBig}>{stopovers} {`Stopover${stopovers === 1 ? "" : "s"}`}</span>
                        </>
                    }
                </Box>
            </Grid>

            <Grid item xs={6} sm={3} style={{ textAlign: 'center' }}>
                <div>
                    <span className={classes.labelBig}>€ {IntlNumber(totalPrice)}</span>
                </div>
            </Grid>
            <Grid item xs={12}>
                <Divider light />
            </Grid>
            <Grid item xs={10}>
                <Grid container>
                    <Grid item xs={12}>
                        <Box maxWidth={500} m="0 auto">
                            {[...airports].slice(0, airports.length - 1).map((airport, index) => {
                                const first = airports[index]
                                const second = airports[index + 1]
                                const key = first + "-" + second
                                return <Grid container key={key}>
                                    <Grid item xs={4}>
                                        <Box display="flex">
                                            <span>{first}</span>
                                            <FlightIcon color="secondary" className={classes.arrowRight} fontSize="small" />
                                            <span>{second}</span>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <span className={classes.subprice}>€ {IntlNumber(prices[index])}</span>

                                    </Grid>
                                    <Grid item xs={4}>
                                        <span>{airlines[index]}</span>
                                    </Grid>
                                </Grid>
                            })}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2}>

                <IconButton aria-label="Expand" color="primary" onClick={handleClickExpanded}>
                    <ExpandMoreIcon fontSize="large" />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <Collapse in={expanded} timeout={600}>
                    <Box position="relative" height={400} test-id="map-container">
                        <MapContainer center={centerPoint} mapsPoints={mapsPoints} />
                    </Box>
                </Collapse>
            </Grid>
        </Grid >
    )
}


