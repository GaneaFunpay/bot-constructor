<template>
  <div class="sign-up-page">
    <h1>Sign Up</h1>
    <form @submit.prevent="submitForm">
      <label for="first_name">First name</label>
      <input type="first_name" name="first_name" v-model="first_name" />
      <br />
      <label for="last_name">Last name</label>
      <input type="last_name" name="last_name" v-model="last_name" />
      <br />
      <label for="email">Email</label>
      <input type="email" name="email" v-model="email" />
      <br />
      <label for="password">Password</label>
      <input type="password" name="password" v-model="password" />
      <br />
      <button type="submit">Sign up</button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    submitForm(event: any) {
      const formData = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
      };

      axios
        .post("/api/v1/authentication/registration/", formData)
        .then((response) => {
          console.log(response);

          this.$router.push("/log-in");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
