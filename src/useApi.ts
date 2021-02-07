import axios, { AxiosResponse } from 'axios'
import { I_Airline, I_Airport, I_Flight } from './types'
import { UseMutateFunction, useMutation, UseMutationOptions } from 'react-query'

// ENDPOINTS
export const ENDPOINT_AIRPORT_ALL = "/airports/all"
export const ENDPOINT_FLIGHTS = "/flights"
export const ENDPOINT_AIRLINES_ALL = "/airlines/all"
//

export const fetchAllAirports = () => axios.get<{ data: I_Airport[] }>(ENDPOINT_AIRPORT_ALL)

/**
 * 
 * @param from codeIata origin
 * @param to codeIata destination
 * @returns list of flight. If more than 1 maybe has got stopovers
 */
export const fetchFligths = (from: string, to: string) => axios.get<{ data: I_Flight[] }>(`${ENDPOINT_FLIGHTS}/from/${from}/to/${to}`)

export const fetchAllAirlines = () => axios.get<{ data: I_Airline[] }>(ENDPOINT_AIRLINES_ALL)

export function useFetchFligths(options?: UseMutationOptions<AxiosResponse<{ data: I_Flight[]; }>, unknown, { from: string; to: string; }, unknown>) {
    const promise = ({ from, to }: { from: string, to: string }) => fetchFligths(from, to)
    return useMutation(promise, options);
}