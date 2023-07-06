<script setup lang="ts">
import type { Passenger } from '@/types';
import type { PropType } from 'vue';

defineProps({
    passenger: {
        type: Object as PropType<Passenger>,
        required: true
    }
})

</script>

<template>
    <RouterLink :to="{ name: 'passenger-details', params: { id: passenger.id } }"
        class="flex flex-col text-black bg-stone-100 w-2/6 p-4 font-serif hover:scale-110 transition-all">
        <div class="flex justify-between">
            <p class="opacity-50">#{{ passenger.id }}</p>
            <p>{{ passenger.gender }}</p>
        </div>
        <div class="flex justify-between items-center">
            <p class="text-2xl">{{ passenger.first_name }} {{ passenger.last_name }}</p>
            <p class="text-xl italic opacity-50">{{ passenger.travelDate }}</p>
        </div>
    </RouterLink>
</template>
