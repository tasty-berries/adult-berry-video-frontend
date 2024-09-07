<script setup lang="ts">
import VideoRepository from "~/repos/VideoRepository";
import type PaginatedCollection from "~/types/PaginatedCollection";

const repo = new VideoRepository();

const page   = ref<number>(1);
const search = ref<string>('');

const videos  = ref<PaginatedCollection<any>>();
const loading = ref<boolean>(false);
const likes   = useLocalStorage<number[]>('likes', () => []);

const scrollRef = ref();

const {reset} = useInfiniteScroll(scrollRef, async () => {
    if (videos.value && videos.value?.data.length >= videos.value?.meta.total)
        return;
    else if (!videos.value)
        return;

    const newVideos = await repo.get({page: ++page.value, search: search.value, ids: likes.value});
    videos.value?.data.push(...newVideos.data);
});

watch(search, async (searchValue) => {
    loading.value = true;

    videos.value = await repo.get({search: search.value, ids: likes.value});

    loading.value = false;
});

watch(videos, value => {
    if (videos.value && videos.value.data.length <= 40) {
        page.value                    = 1;
        scrollRef.value.$el.scrollTop = 0;
        reset();
    }
});

onMounted(async () => {
    videos.value = await repo.get({search: search.value, ids: likes.value});
});
</script>

<template>
    <UDashboardPage>
        <Head>
            <title>My videos</title>
        </Head>

        <UDashboardPanel grow>
            <UDashboardNavbar title="My videos"/>

            <UDashboardToolbar>
                <SearchInput placeholder="Search videos..."
                             :loading="loading"
                             v-model="search"/>
            </UDashboardToolbar>

            <UDashboardPanelContent class="p-2.5" ref="scrollRef">
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