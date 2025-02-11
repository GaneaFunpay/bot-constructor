<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><DarkMode /></li>
          <li><RouterLink to="/" class="nav-link px-2 link-secondary">Home</RouterLink></li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
        </form>

        <div v-if="!authenticationStore.isAuthenticated" class="text-end">
          <RouterLink to="/sign-in" type="button" class="btn btn-outline-success me-2">Sign in</RouterLink>
          <RouterLink to="/sign-up" type="button" class="btn btn-warning">Sign up</RouterLink>
        </div>

        <div v-else class="dropdown text-end">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><button class="dropdown-item" href="#" v-on:click="handleSignOut">Sign out</button></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { useAuthenticationStore } from "@/stores";
import { mapStores } from "pinia";
import DarkMode from "@/components/DarkMode.vue";



export default {
  components: {DarkMode},
  computed: {
    ...mapStores(useAuthenticationStore)
  },
  methods: {
    handleSignOut(event: any) {
      event.preventDefault();
      this.authenticationStore.signOut();
      this.$router.push("/");
    },
  },
};
</script>
