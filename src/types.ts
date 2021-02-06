export interface I_Airport {
    codeIata: string
    id: number
    latitude: number
    longitude: number
}

export interface I_Flight {
    airlineId: number
    arrivalAirportId: number
    departureAirportId: number
    id: number
    price: number
}

export interface I_Airline {
    id: number,
    name: string
}

export interface I_MapPoint extends google.maps.LatLngLiteral {
    title: string
}