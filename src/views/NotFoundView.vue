<template>
    <div class="w-2/6 p-12 flex flex-col font-mono text-center">
        <div class="w-full h-full bg-red-500 p-4 text-white">
            <p class="text-[48pt] font-bold">HTTP 404</p>
        </div>
        <div class="w-full h-full bg-stone-50 p-8 shadow-lg text-black font-sans">
            <div class="flex flex-col gap-2">
                <p class="text-3xl font-bold text-left">Oops!</p>
                <p class="text-2xl text-left">The {{ resource }} you're looking for doesn't exist.</p>
                <div class="flex justify-center items-center mt-4">
                    <RouterLink class="font-bold border border-black hover:bg-black hover:text-white transition-colors py-2 px-4" to="/">Return</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    resource: {
        type: String,
        required: true,
        default: "page",
    }
})
</script>
