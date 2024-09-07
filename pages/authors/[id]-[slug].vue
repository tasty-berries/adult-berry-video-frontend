<script setup lang="ts">
import AuthorRepository from "~/repos/AuthorRepository";

const route = useRoute();
const id    = parseInt(route.params.id as string);
const slug  = route.params.slug as string;
const repo  = new AuthorRepository();
const page   = ref<number>(1);
const search = ref<string>('');

const {data: author} = await repo.show(id);
const {data: videos, status} = await repo.videos(id, () => ({search: search.value}));

const scrollRef = ref();

const {reset} = useInfiniteScroll(scrollRef, async () => {
    const newVideos = await repo.getVideos(id, {page: ++page.value, search: search.value});
    videos.value?.data.push(...newVideos.data);
});

watch(videos, value => {
    if (videos.value && videos.value.data.length <= 40) {
        page.value = 1;
        scrollRef.value.$el.scrollTop = 0;
        reset();
    }
});
</script>

<template>
    <UDashboardPage>
        <Head>
            <title>{{ author?.data.name }}</title>
        </Head>

        <UDashboardPanel grow>
            <UDashboardNavbar :title="author?.data.name"/>

            <UDashboardToolbar>
                <SearchInput placeholder="Search videos..."
                             :loading="status === 'pending'"
                             v-model="search"/>
            </UDashboardToolbar>

            <UDashboardPanelContent v-if="author?.data" class="p-2.5" ref="scrollRef">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div v-for="video in videos?.data" :key="video.id">
                        <VideoCard :item="video"/>
                    </div>
                </div>
            </UDashboardPanelContent>
        </UDashboardPanel>
    </UDashboardPage>
</template>

<style scoped>

</style>