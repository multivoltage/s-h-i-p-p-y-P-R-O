import { useMemo } from 'react'
import { I_Airline, I_Airport, I_Flight, I_MapPoint } from '../../types'
import { getSolutionPath } from '../../utils'
import { I_Solution, Solution } from './Solution'

interface I_SolutionContainer {
    airports: I_Airport[],
    flights: I_Flight[]
    airlines: I_Airline[]
}

// used for composing data
export const SolutionContainer: React.FC<I_SolutionContainer> = ({ airports, flights, airlines }) => {

    const mappingAirports = useMemo(() => airports.reduce((acc, cv) => {
        acc[cv.id] = cv
        return acc
    }, {} as { [key: number]: I_Airport }), [])

    const mappingAirlines = useMemo(() => airlines.reduce((acc, cv) => {
        acc[cv.id] = cv
        return acc
    }, {} as { [key: number]: I_Airline }), [])

    const totalPrice = flights.reduce((acc, cv) => (acc + cv.price), 0)
    const path = getSolutionPath(flights).map(id => mappingAirports[id].codeIata)
    const pathIds = getSolutionPath(flights).map(id => mappingAirports[id].id)
    const airlinesPath = flights.map(f => mappingAirlines[f.airlineId].name)

    const mapPoints = pathIds.reduce((acc, cv) => {
        const airport = mappingAirports[cv]
        acc.push({
            lat: airport.latitude,
            lng: airport.longitude,
            title: airport.codeIata
        })
        return acc
    }, [] as I_MapPoint[])

    const mapPointsMemo = useMemo(() => mapPoints, [])

    const solution: I_Solution = {
        prices: flights.map(f => f.price),
        totalPrice,
        airports: path,
        airlines: airlinesPath,
        mapsPoints: mapPointsMemo
    }

    return <Solution {...solution} />
}