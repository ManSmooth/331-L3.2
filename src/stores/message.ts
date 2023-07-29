import { defineStore } from 'pinia'
export const useMessageStore = defineStore('message', {
  state: () => ({
    message: '' as string
  }),
  actions: {
    setMessage(message: string) {
      this.message = message
    },
    resetMessage() {
      this.message = ''
    }
  }
})
