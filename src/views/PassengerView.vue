<script setup lang="ts">
import PassengerAPIServices from '@/services/PassengerAPIServices';
import type { Passenger } from '@/types';
import type { AxiosError } from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
    id: {
        type: Number,
        required: true,
    }
})
const passenger = ref<Passenger | null>()
const router = useRouter()

PassengerAPIServices.getPassenger(props.id).then((res) => {
    passenger.value = res.data
}).catch((err: AxiosError) => {
    console.error(err)
    if (err.response && err.response.status === 404) {
        router.push({ name: '404-resource', params: { resource: 'passenger' } })
    } else if (err.code === 'ERR_NETWORK')
        router.push({ name: 'network-error' })
})
</script>
<template>
    <div v-if="passenger" class="p-4 flex justify-center w-full">
        <div class="bg-stone-50 text-black p-4 font-serif w-3/6 flex flex-col gap-4">
            <div class="flex flex-col">
                <p class="opacity-50">Passenger #{{ passenger.id }}</p>
                <p class="text-3xl">{{ passenger.first_name }} {{ passenger.last_name }}</p>
            </div>
            <div class="flex flex-row gap-2 min-h-[240px]">
                <div class="flex flex-col items-start w-fit">
                    <RouterLink
                        class="w-20 border-box transition-all px-4 py-2 text-center border-l border-dashed border-black hover:border-solid [&.router-link-active]:border-solid [&.router-link-active]:border-l-2 hover:border-l-2 hover:border-rose-500 hover:text-rose-500"
                        :to="{ name: 'passenger-details', params: { id: props.id } }">Details</RouterLink>
                    <RouterLink
                        class="w-20 border-box transition-all px-4 py-2 text-center border-l border-dashed border-black hover:border-solid [&.router-link-active]:border-solid [&.router-link-active]:border-l-2 hover:border-l-2 hover:border-rose-500 hover:text-rose-500"
                        :to="{ name: 'passenger-airline', params: { id: props.id } }">Airline</RouterLink>
                </div>
                <hr class="border-r h-full border-stone-400 mr-4">
                <RouterView :passenger="passenger" class="w-full" />
            </div>
        </div>
    </div>
</template>
