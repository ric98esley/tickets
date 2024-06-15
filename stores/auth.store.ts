import { defineStore } from 'pinia'

interface User {
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


export const useAuthStore = defineStore('alerts', {
  state: (): { token: string| undefined, user: User |undefined} => {
    return {
      user: undefined,
      token: undefined,
    }
  },
  actions: {
    setAuthState(token?: string, user?: User) {
      this.token = token;
      this.user = user;
    },

    reset() {
      this.token = undefined;
      this.user = undefined;
      localStorage.removeItem('pocketbase_auth')
      navigateTo("/login");
    },

    readToken() {
      let auth = {
        token: undefined,
        user: undefined,
      };
      try {
        auth = JSON.parse(localStorage.getItem("pocketbase_auth") || "{}");
      } catch (error) {
        console.log(error);
      }
      //saving auth in state
      if (!auth) {
        this.token = undefined;
        this.user = undefined;
      }
      if (auth) {
        this.token = auth.token;
        this.user = auth.user;
      }
    },
  },
})