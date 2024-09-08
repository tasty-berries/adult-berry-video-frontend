<script setup lang="ts">
import AuthorRepository from "~/repos/AuthorRepository";

const favoriteAuthors = useLocalStorage<number[]>('favoriteAuthors', () => []);

const authors = ref();

const columns = [{
    key  : 'id',
    label: '#'
}, {
    key  : 'name',
    label: 'Name'
}, {
    key: 'actions'
}];

const rows = computed(() => {
    return authors.value?.data.map((author: any) => ({
        id  : author.id,
        name: author.name
    })) ?? [];
});

onMounted(async () => {
    if (favoriteAuthors.value.length === 0)
        return;

    const repo    = new AuthorRepository();
    authors.value = await repo.get({ids: favoriteAuthors.value});
});
</script>

<template>
    <UDashboardPage>
        <Head>
            <title>My authors</title>
        </Head>

        <UDashboardPanel grow>
            <UDashboardNavbar title="My authors"/>

            <UTable :columns="columns" :rows="rows" @select="navigateTo(`/authors/${$event.id}-${slugify($event.name)}`)">
                <template #actions-data="{row}">
                    <div class="text-right">
                        <UButton color="gray"
                                 icon="i-heroicons-chevron-right"
                                 :to="`/authors/${row.id}-${slugify(row.name)}`"/>
                    </div>
                </template>
            </UTable>
        </UDashboardPanel>
    </UDashboardPage>
</template>

<style scoped>

</style>