<script setup lang="ts">
import { type PropType } from 'vue';
import type { Passenger } from '@/types';

defineProps({
    passenger: {
        type: Object as PropType<Passenger>,
        required: true
    }
})
</script>

<template>
    <div class="flex flex-col gap-2">
        <p><span class="font-bold">Gender:</span> {{ passenger.gender }}</p>
        <p><span class="font-bold">Email:</span> {{ passenger.email }}</p>
        <p><span class="font-bold">IP Address:</span> {{ passenger.ip_address }}</p>
        <p><span class="font-bold">Source:</span> {{ passenger.Source }}</p>
        <p><span class="font-bold">Destination:</span> {{ passenger.Destination }}</p>
        <p><span class="font-bold">Travel Date:</span> {{ passenger.travelDate }}</p>
    </div>
</template>
