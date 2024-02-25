<template>
  <form @submit.prevent="submitForm">
    <label for="email">Email</label>
    <input type="email" name="email" v-model="email" />
    <br />
    <label for="password">Password</label>
    <input type="password" name="password" v-model="password" />
    <br />
    <button type="submit">Sign in</button>
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
