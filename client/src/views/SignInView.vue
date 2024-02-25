<template>
  <div>
    <h1>{{ name }}</h1>
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
