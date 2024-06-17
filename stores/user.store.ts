import { defineStore } from 'pinia'
import type { User } from '~/types/index'

export const useUserStore = defineStore('user', {
  state: () : { user: User | undefined } => ({
    user: undefined,
  }),
  actions: {
    login(user: any) {
      this.user = user
    },
    logout() {
      this.user = undefined
    },
  },
})