<script setup lang="ts">
import PassengerAPIServices from '@/services/PassengerAPIServices';
import type { Passenger } from '@/types';
import { computed, onMounted, ref, watch } from 'vue';
import PassengerCard from '@/components/PassengerCard.vue';
const passengers = ref<Passenger[]>([])
const totalPassengers = ref<number>(0)
const loading = ref<boolean>(false)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

watch(() => props.page, (newPage) => {
  changePage(newPage)
})

const hasNextPage = computed(() => {
  return props.page.valueOf() < Math.ceil(totalPassengers.value / 5)
})

const changePage = (page: number) => {
  loading.value = true
  PassengerAPIServices.getPassengers(page, 5).then((res) => {
    passengers.value = res.data
    totalPassengers.value = res.headers['x-total-count']
    loading.value = false
  }).catch((err) => {
    console.error(err)
  })
}

onMounted(() => {
  changePage(props.page)
})
</script>

<template>
  <div class="flex flex-col w-full p-4 items-center">
    <div class="flex justify-between w-64 items-center font-serif">
      <div class="flex gap-2">
        <RouterLink class="border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white w-8 h-8 flex items-center justify-center transition-all"
          :to="{ name: 'passenger-list', query: { page: 1 } }" rel="prev"
          :class="{ 'invisible': props.page <= 1, 'pointer-events-none': loading }">
          &lt;&lt;</RouterLink>
        <RouterLink class="border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white w-8 h-8 flex items-center justify-center transition-all"
          :to="{ name: 'passenger-list', query: { page: props.page - 1 } }" rel="prev"
          :class="{ 'invisible': props.page <= 1, 'pointer-events-none': loading }">
          &lt;</RouterLink>
      </div>
      <p class="text-xl">{{ page }}</p>
      <div class="flex gap-2">
        <RouterLink class="border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white w-8 h-8 flex items-center justify-center transition-all"
          :to="{ name: 'passenger-list', query: { page: props.page + 1 } }" rel="next"
          :class="{ 'invisible': !hasNextPage, 'pointer-events-none': loading }">
          &gt;</RouterLink>
        <RouterLink class="border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white w-8 h-8 flex items-center justify-center transition-all"
          :to="{ name: 'passenger-list', query: { page: Math.ceil(totalPassengers / 5) } }" rel="next"
          :class="{ 'invisible': !hasNextPage, 'pointer-events-none': loading }">
          &gt;&gt;</RouterLink>
      </div>
    </div>
    <div class="flex flex-col items-center gap-4 py-4 transition-opacity w-full" :class="{ 'opacity-50': loading }">
      <PassengerCard v-for="passenger in passengers" :key="passenger.id" :passenger="passenger" />
    </div>
  </div>
</template>
