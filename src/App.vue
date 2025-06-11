<template>
  <div class="bg-gray-50 min-h-screen">
    <MainProfile />
    <MainNav />
    <div class="max-w-5xl mx-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import MainProfile from './components/MainProfile.vue'
import MainNav from './components/MainNav.vue'
</script>