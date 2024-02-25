<template>
    <header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink v-if="!authenticationStore.isAuthenticated" to="/sign-up">Sign up</RouterLink>
            <RouterLink v-if="!authenticationStore.isAuthenticated" to="/sign-in">Sign in</RouterLink>
            <button v-else v-on:click="handleSignOut">Sign out</button>
        </nav>
    </header>
</template>

<script lang="ts">
import { useAuthenticationStore } from "@/stores";
import { mapStores } from "pinia";



export default {
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