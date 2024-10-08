<script setup lang="ts">
import VideoRepository from "~/repos/VideoRepository";

const route = useRoute();
const id    = parseInt(route.params.id as string);
const repo  = new VideoRepository();

const {data: page} = repo.show(id);

const likes           = useLocalStorage<number[]>('likes', () => [], {initOnMounted: true});
const dislikes        = useLocalStorage<number[]>('dislikes', () => [], {initOnMounted: true});
const favoriteAuthors = useLocalStorage<number[]>('favoriteAuthors', () => [], {initOnMounted: true});

const wasLiked          = computed(() => likes.value.find(like => like === id) != undefined);
const wasDisliked       = computed(() => dislikes.value.find(like => like === id) != undefined);
const wasFavoriteAuthor = computed(() => favoriteAuthors.value.find(author => author ===
                                                                              page.value?.data.video.author.id));

function like() {
    if (wasDisliked.value)
        dislike();

    if (wasLiked.value)
        likes.value = likes.value.filter(like => like !== id);
    else
        likes.value.push(id);
}

function dislike() {
    if (wasLiked.value)
        like();

    if (wasDisliked.value)
        dislikes.value = dislikes.value.filter(dislike => dislike !== id);
    else
        dislikes.value.push(id);
}

function favoriteAuthor() {
    if (wasFavoriteAuthor.value)
        favoriteAuthors.value = favoriteAuthors.value.filter(author => author !== page.value?.data.video.author.id);
    else
        favoriteAuthors.value.push(page.value?.data.video.author.id);
}

const viewAccepted = useCookie<boolean | undefined>(
    'viewAccepted',
    {default: () => undefined, expires: new Date(Date.now() + 24 * 3600 * 365 * 1000)}
);
</script>

<template>
    <UDashboardPage>
        <Head>
            <title>{{ page?.data.video.title }}</title>
        </Head>

        <UDashboardPanel grow>
            <UDashboardNavbar title="Watch"/>

            <UDashboardPanelContent v-if="page?.data">
                <div class="flex flex-col md:flex-row gap-5">
                    <div class="flex flex-col grow gap-2.5 md:w-0">
                        <div v-if="page.data.video.video"
                             class="max-h-[600px] rounded-md overflow-clip bg-black">
                            <div v-if="!viewAccepted" class="flex items-center justify-center h-full">
                                <UIcon name="i-heroicons-eye-slash-solid" class="text-white text-8xl"/>
                            </div>

                            <video v-else
                                   :src="fileUrl(page.data.video.video)"
                                   controls
                                   class="w-full h-full aspect-[16/9]"
                                   autoplay
                                   playsinline/>
                        </div>

                        <div class="flex flex-col items-start gap-2.5 w-full">
                            <div class="flex justify-between items-start gap-2.5 w-full">
                                <div class="truncate">
                                    <h3 class="text-lg md:text-2xl font-semibold truncate">{{ page.data.video.title }}</h3>
                                    <span>{{ page.data.video.views }} views</span>
                                </div>

                                <div class="flex gap-2.5">
                                    <UButton label="Like"
                                             icon="i-heroicons-hand-thumb-up"
                                             :color="wasLiked ? 'green' : 'gray'"
                                             class="[&>span+span]:hidden md:[&>span+span]:inline"
                                             @click="like"/>

                                    <UButton label="Dislike"
                                             icon="i-heroicons-hand-thumb-down"
                                             :color="wasDisliked ? 'red' : 'gray'"
                                             class="[&>span+span]:hidden md:[&>span+span]:inline"
                                             @click="dislike"/>
                                </div>
                            </div>

                            <div v-if="page.data.video.author"
                                 class="cursor-pointer flex gap-5 items-center bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md py-1 px-2.5"
                                 @click.self="navigateTo(`/authors/${page.data.video.author.id}-${slugify(page.data.video.author.name)}`)">
                                <div>
                                    <p class="text-sm font-semibold leading-3 mt-1">Author</p>
                                    <NuxtLink
                                        :to="`/authors/${page.data.video.author.id}-${slugify(page.data.video.author.name)}`">
                                        <span>{{ page.data.video.author.name }}</span>
                                    </NuxtLink>
                                </div>

                                <UButton label="Favorite"
                                         :color="wasFavoriteAuthor ? 'red' : 'gray'"
                                         :icon="wasFavoriteAuthor ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
                                         @click="favoriteAuthor"/>
                            </div>

                            <div v-if="page.data.video.hentai_title">
                                <span class="me-1.5">Title:</span>

                                <NuxtLink :to="`/titles/${page.data.video.hentai_title.id}-${slugify(page.data.video.hentai_title.name)}`">
                                    <UBadge color="gray">
                                        {{ page.data.video.hentai_title.name }}
                                    </UBadge>
                                </NuxtLink>
                            </div>

                            <div v-if="page.data.video.tags && page.data.video.tags.length > 0">
                                <span class="me-1.5">Tags:</span>

                                <div class="inline-flex flex-wrap gap-1.5">
                                    <NuxtLink v-for="tag in page.data.video.tags"
                                              :to="`/tags/${tag.id}-${slugify(tag.name)}`">
                                        <UBadge color="gray">
                                            {{ tag.name }}
                                        </UBadge>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="min-w-[300px] md:w-[200px] lg:w-[300px] shrink-0">
                        <h3 class="font-semibold text-xl mb-2.5">Popular</h3>

                        <div class="flex flex-col gap-5">
                            <div v-for="video in page.data.popular" :key="video.id">
                                <VideoCard :item="video" class="bg-gray-950"/>
                            </div>
                        </div>
                    </div>
                </div>
            </UDashboardPanelContent>
        </UDashboardPanel>
    </UDashboardPage>
</template>

<style scoped>

</style>