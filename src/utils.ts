import { I_Flight, I_MapPoint } from "./types";

export function IntlNumber(
    value: number | undefined,
    options?: Intl.NumberFormatOptions
) {
    if (value === undefined) {
        return "";
    }
    if (value === 0) {
        return "0";
    }
    return Intl.NumberFormat("it-IT", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        ...options,
    }).format(value);
}

/**
 * @param fligths flights returned by api (ordered by origin and destination)
 * @description this method split the list in sublist if it found that there are multiple solutions
 */
export function splitSolutions(fligths: I_Flight[]): I_Flight[][] {
    if (!fligths.length) {
        return []
    }
    const airportIdTo = fligths[fligths.length - 1].arrivalAirportId

    let index = 0

    const obj: { [key: number]: I_Flight[] } = {}
    fligths.forEach(f => {
        const to = f.arrivalAirportId
        const sublist = obj[index] || []
        sublist.push(f)
        obj[index] = sublist

        if (to === airportIdTo) {
            // this flight arrive at destination correctly, so next item is for another solution
            // for the same destination
            index++
        }
    })

    return Object.keys(obj).sort().reduce((acc, cv) => {
        const sublist = obj[Number(cv)]
        acc.push(sublist)
        return acc
    }, [] as I_Flight[][])
}

/**
 * 
 * @param flights flights returned by api (ordered by origin and destination)
 * @returns Array<number> rappresenting the path from origin to destination
 */
export function getSolutionPath(flights: I_Flight[]): number[] {
    return flights.reduce((acc, cv) => {
        if (!acc.includes(cv.departureAirportId)) {
            acc.push(cv.departureAirportId)
        }
        if (!acc.includes(cv.arrivalAirportId)) {
            acc.push(cv.arrivalAirportId)
        }
        return acc
    }, [] as number[])
}

export function getMediumPoint(list: I_MapPoint[]): google.maps.LatLngLiteral {
    const sumLat = list.reduce((acc, cv) => acc + cv.lat, 0)
    const sumLng = list.reduce((acc, cv) => acc + cv.lng, 0)
    const mediumLat = sumLat / list.length
    const mediumLng = sumLng / list.length
    return {
        lat: mediumLat,
        lng: mediumLng
    };
}