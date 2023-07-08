<template>
    <div class="w-2/6 p-12 flex flex-col font-mono text-center">
        <div class="w-full h-full bg-red-500 p-4 text-white">
            <p class="text-[48pt] font-bold">NETWORK ERROR</p>
        </div>
        <div class="w-full h-full bg-stone-50 p-8 shadow-lg text-black font-sans text-left">
            <div class="flex flex-col gap-2">
                <p class="text-3xl font-bold">Uh-Oh!</p>
                <p class="text-xl">Looks like you are experiencing some network issues, please take a breather and <a
                        class="font-bold hover:text-rose-500 transition-colors" href="#" @click="router.go(-1)">click
                        here</a> to go back.</p>
                <p>Sorry, we cannot fetch the data from the server.</p>
                <p>Please try again later.</p>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>
