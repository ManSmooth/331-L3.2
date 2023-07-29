import type { Passenger } from '@/types'
import { defineStore } from 'pinia'
export const usePassengerStore = defineStore('passenger', {
  state: () => ({
    passenger: null as Passenger | null
  }),
  actions: {
    setPassenger(passenger: Passenger) {
      this.passenger = passenger
    },
    resetPassenger() {
      this.passenger = null
    }
  }
})
