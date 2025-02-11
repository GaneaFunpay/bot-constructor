<template>
  <button class="btn btn-outline-primary" type="button" v-on:click="toggleDark()">
    <i v-if="isDark" class="bi bi-moon-stars-fill"></i>
    <i v-else class="bi bi-sun-fill"></i>
  </button>
</template>

<script setup lang="ts">
import {useDark, useToggle} from "@vueuse/core";

const isDark = useDark({
  attribute: "data-bs-theme", // attribute name
})
const toggleDark = useToggle(isDark)
</script>
