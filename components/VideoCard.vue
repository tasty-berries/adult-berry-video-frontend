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
            <NuxtLink :to="`/watch/${item.id}`" :title="item.title"
                      class="block font-semibold text-lg truncate leading-6">
                {{ item.title }}
            </NuxtLink>

            <div class="flex items-center justify-start gap-1.5 leading-4">
                <template v-if="item.author">
                    <div class="truncate">
                        <NuxtLink :to="`/authors/${item.author.id}-${slugify(item.author.name)}`"
                                  :title="item.author.name">
                            <span class="truncate">{{ item.author.name }}</span>
                        </NuxtLink>
                    </div>

                    <span>•</span>
                </template>

                <template v-if="item.hentai_title">
                    <div class="truncate">
                        <NuxtLink :to="`/titles/${item.hentai_title.id}-${slugify(item.hentai_title.name)}`"
                                  :title="item.hentai_title.name">
                            <span class="truncate">{{ item.hentai_title.name }}</span>
                        </NuxtLink>
                    </div>

                    <span>•</span>
                </template>

                <div class="shrink-0">{{ item.views }} views</div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>