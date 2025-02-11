<template>
  <div class="container-signin m-auto w-100 ">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    <SignInForm />
  </div>
</template>

<script lang="ts">
import SignInForm from "../components/SignInForm.vue";

export default {
  name: "SignIn",
  props: {
    msg: String,
  },
  components: {
    SignInForm,
  },
  data() {
    return {
      name: "Sign in page",
    };
  },
};
</script>
