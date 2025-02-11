import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from "@/views/SignUpView.vue"
import SignInView from "@/views/SignInView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: SignUpView,
    },
    {
      path: "/sign-in",
      name: "SignIn",
      component: SignInView,
    },
  ],
})

export default router
