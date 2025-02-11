<template>
  <form @submit.prevent="submitForm">
    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" v-model="email" />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password" v-model="password" />
      <label for="floatingPassword">Password</label>
    </div>

    <div class="form-check text-start my-3">
      <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
      <label class="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
    <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
  </form>
</template>

<script lang="ts">
import { useAuthenticationStore } from '@/stores';
import { mapStores } from 'pinia';


export default {
  data() {
    return {
      email: "",
      password: "",
      nextPath: "/",
      errorMessage: "",
    };
  },
  computed: {
    ...mapStores(useAuthenticationStore)
  },
  mounted() {
    this.updateAfterSigninNextPath();
  },
  methods: {
    submitForm(event: any) {
      this.authenticationStore.signIn(this.email, this.password).then(() =>
        this.$router.push(this.nextPath)
      );
    },
    updateAfterSigninNextPath() {
      if ("next" in this.$route.query) {
        this.nextPath = this.$route.query.next;
      }
    },
  },
};
</script>
