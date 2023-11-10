import { defineStore } from 'pinia'

export default defineStore('modal', {
  state: () => ({
    isOpen: false
  }),
  getters: {
    hiddenClass(state) {
      // This is a getter that returns a class name
      return state.isOpen ? '' : 'hidden'
    }
  }
})
