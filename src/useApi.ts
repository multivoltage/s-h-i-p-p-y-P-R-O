import axios from 'axios'
import { I_Airport } from './types'

// ENDPOINTS
export const ENDPOINT_AIRPORT_ALL = "/airports/all"
//

export const fetchAllAirports = () => axios.get<{ data: I_Airport[] }>(ENDPOINT_AIRPORT_ALL)
