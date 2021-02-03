import axios, { AxiosResponse } from 'axios'
import { I_Airport } from './types'
import { useMutation } from 'react-query'

// ENDPOINTS
export const ENDPOINT_AIRPORT_ALL = "/airports/all"
export const ENDPOINT_FLIGHTS = "/flights"
//

export const fetchAllAirports = () => axios.get<{ data: I_Airport[] }>(ENDPOINT_AIRPORT_ALL)
export const fetchFligths = (from: string, to: string) => axios.get(`${ENDPOINT_FLIGHTS}/from/${from}/to/${to}`)

export function useFetchFlifths() {
    const promise = ({ from, to }: { from: string, to: string }) => fetchFligths(from, to)
    return useMutation(promise);
}