import type { Airline, Passenger } from '@/types'
import axios, { type AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/se331-2022/passengerdb/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getPassengers: (page: number, limit: number) => {
    return apiClient.get<Passenger[]>(`/passenger?_page=${page}&_limit=${limit}`)
  },
  getPassenger: (id: number) => {
    return apiClient.get<Passenger>(`/passenger/${id}`)
  },
  getAirlines: (page: number, limit: number) => {
    return apiClient.get<Airline[]>(`/airline?_page=${page}&_limit=${limit}`)
  },
  getAirline: (id: number) => {
    return apiClient.get<Airline>(`/airline/${id}`)
  }
}
