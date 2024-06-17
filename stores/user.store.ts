import { defineStore } from 'pinia'

export interface User {
  avatar:          string;
  collectionId:    string;
  collectionName:  string;
  created:         Date;
  email:           string;
  emailVisibility: boolean;
  id:              string;
  name:            string;
  role:            string;
  updated:         Date;
  username:        string;
  verified:        boolean;
}

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