<script setup lang="ts">
import { ref, type PropType } from 'vue';
import type { Airline, Passenger } from '@/types';
import PassengerAPIServices from '@/services/PassengerAPIServices';
import type { AxiosError } from 'axios';
import { useRouter } from 'vue-router';

const props = defineProps({
    passenger: {
        type: Object as PropType<Passenger>,
        required: true
    }
})
const airline = ref<Airline | null>()
const router = useRouter()

PassengerAPIServices.getAirline(props.passenger.airlineId).then((res) => {
    airline.value = res.data
}).catch((err: AxiosError) => {
    if (err.response && err.response.status === 404) {
        router.push({ name: '404-resource', params: { resource: 'airline' } })
    } else if (err.code === 'ERR_NETWORK')
        router.push({ name: 'network-error' })
})
</script>

<template>
    <div v-if="airline" class="flex flex-col gap-2">
        <p class="opacity-50">Airline #{{ airline.id }}</p>
        <p class="text-3xl">{{ airline.AirlineName }}</p>
        <p><span class="font-bold">Email:</span> {{ airline.email }}</p>
        <p><span class="font-bold">Address:</span> {{ airline.address }}</p>
    </div>
</template>
