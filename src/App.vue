<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="flex flex-row bg-stone-800 py-2 px-4 text-white gap-4 items-center">
      <RouterLink class="font-bold font-serif text-2xl group" :to="{ name: 'passenger-list', query: { page: 1 } }">
        Passenger<span class="text-stone-500 group-[&.router-link-active]:text-rose-500 group-hover:text-rose-500 transition-colors">DB</span>
      </RouterLink>
    </nav>
  </header>
  <main class="text-white flex justify-center relative">
    <RouterView />
  </main>
</template>
