<script setup lang="ts">
import VideoRepository from "~/repos/VideoRepository";

const repo = new VideoRepository();

const page   = ref<number>(1);
const search = ref<string>('');

const {data: videos, status} = await repo.index(() => ({search: search.value}));

const scrollRef = ref();

const {reset} = useInfiniteScroll(scrollRef, async () => {
    if (videos.value && videos.value?.data.length >= videos.value?.meta.total)
        return;
    else if (!videos.value)
        return;

    const newVideos = await repo.get({page: ++page.value, search: search.value});
    videos.value?.data.push(...newVideos.data);
});

watch(videos, value => {
    if (value && value.data.length <= 40) {
        page.value                    = 1;
        scrollRef.value.$el.scrollTop = 0;
        reset();
    }
});
</script>

<template>
    <UDashboardPage>
        <Head>
            <title>Popular</title>
        </Head>

        <UDashboardPanel grow>
            <UDashboardNavbar title="Popular"/>

            <UDashboardToolbar>
                <SearchInput placeholder="Search videos..."
                             :loading="status === 'pending'"
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