<script setup lang="ts">
defineProps<{
    item: any
}>();
</script>

<template>

    <div class="flex flex-col gap-1.5 p-3.5 cursor-pointer rounded-xl overflow-clip hover:bg-gray-200 hover:dark:bg-gray-950"
         @click="navigateTo(`/watch/${item.id}`)">
        <NuxtLink :to="`/watch/${item.id}`" class="block">
            <AdultImage :src="fileUrl(item.preview)" :alt="item.title" :wrapper="{class: 'rounded-md'}"/>
        </NuxtLink>

        <div>
            <NuxtLink :to="`/watch/${item.id}`"
                      class="block font-semibold text-lg truncate leading-6">
                {{ item.title }}
            </NuxtLink>

            <div class="flex flex-wrap items-center gap-1.5 leading-4">
                <template v-if="item.author">
                    <NuxtLink :to="`/authors/${item.author.id}-${slugify(item.author.name)}`">
                        <span>{{ item.author.name }}</span>
                    </NuxtLink>

                    <span>•</span>
                </template>

                <span>{{ item.views }} views</span>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>