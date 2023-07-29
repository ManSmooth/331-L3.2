<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'nprogress/nprogress.css'
import { useMessageStore } from './stores/message';
import { storeToRefs } from 'pinia';
const { message } = storeToRefs(useMessageStore())
</script>

<template>
  <header>
    <div v-if="message" class="fixed w-[100vw] h-[100vh] flex justify-center items-center bg-[#00000033] z-40">
      <div class="bg-white w-fit h-fit z-50 flex justify-center items-center gap-4 p-4">
        <img src="/90-ring-with-bg.svg" class="animate-spin"/>
        <p class="text-center text-lg">
          {{ message }}
        </p>
      </div>
    </div>
    <nav class="flex flex-row bg-stone-800 py-2 px-4 text-white gap-4 items-center">
      <RouterLink class="font-bold font-serif text-2xl group" :to="{ name: 'passenger-list', query: { page: 1 } }">
        Passenger<span
          class="text-stone-500 group-[&.router-link-active]:text-rose-500 group-hover:text-rose-500 transition-colors">DB</span>
      </RouterLink>
    </nav>
  </header>
  <main class="text-white flex justify-center relative">
    <RouterView />
  </main>
</template>
