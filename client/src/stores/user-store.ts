import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { signInUser, signOutUser } from "../services/api/authentication";


export interface State {
  user: any
  isAuthenticated: any
}

export const useAuthenticationStore = defineStore('authentication', {
  // convert to a function
  state: (): State => ({
    user: useLocalStorage('user', ''),
    isAuthenticated: useLocalStorage('isAuthenticated', false)
  }),
  getters: {
    // firstName getter removed, no longer needed
    fullName: (state) => state.user.toString(),
    authenticated: (state) => state.isAuthenticated,
  },
  actions: {
    signIn(email: string, password: string) {
      return signInUser(email, password)
        .then(() => {
          this.signInSuccess(email)
          return Promise.resolve();
        })
        .catch((error) => {
          this.signOutMutation()
          return Promise.reject(error);
        });
    },
    signOut() {
      signOutUser();
      this.signOutMutation()
    },
    signInSuccess(userId: any) {
      this.user = userId;
      this.isAuthenticated = true;
    },
    signOutMutation() {
      this.user = '';
      this.isAuthenticated = false;
    },
  }
})
