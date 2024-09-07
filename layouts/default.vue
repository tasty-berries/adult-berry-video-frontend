<script setup lang="ts">
import TagRepository from "~/repos/TagRepository";
import SectionRepository from "~/repos/SectionRepository";

const route = useRoute();

const tagRepo      = new TagRepository();
const {data: tags} = await tagRepo.index();

const sectionRepo      = new SectionRepository();
const {data: sections} = await sectionRepo.index();

const search = ref<string>('');

const links = computed(() => {
    const data = [{
        label: 'Popular',
        icon : 'i-heroicons-star',
        to   : '/'
    }, {
        label: 'My videos',
        icon : 'i-heroicons-heart',
        to   : '/my-videos'
    }, {
        label: 'My authors',
        icon : 'i-heroicons-user',
        to   : '/my-authors'
    }];

    if (sections.value?.data) {
        data.push({
            label      : 'Sections',
            icon       : 'i-heroicons-sparkles',
            defaultOpen: route.path.startsWith('/sections') || !!search.value.trim(),
            children   : sections.value.data.map((section: any) => ({
                label: section.name,
                to   : `/sections/${section.id}-${slugify(section.name)}`
            }))
        });
    }

    if (tags.value?.data) {
        data.push({
            label      : 'Tags',
            icon       : 'i-heroicons-tag',
            defaultOpen: route.path.startsWith('/tags') || !!search.value.trim(),
            children   : tags.value.data.map((tag: any) => ({
                label: tag.name,
                to   : `/tags/${tag.id}-${slugify(tag.name)}`
            }))
        });
    }

    return data.filter((item: any) => {
        const input = search.value.toLowerCase();

        if (!item.hasOwnProperty('children'))
            return item.label.toLowerCase().includes(input);

        item.children = item.children.filter((_item: any) => _item.label.toLowerCase().includes(input));

        return item.children.length > 0;
    });
});
</script>

<template>
    <NuxtLoadingIndicator/>

    <UDashboardLayout>
        <UDashboardPanel :width="300" :resizable="{ min: 200, max: 400 }" collapsible>
            <UDashboardNavbar>
                <template #title>
                    <NuxtLink to="/">Berry Hub</NuxtLink>
                </template>

                <template #right>
                    <UColorModeButton/>
                </template>
            </UDashboardNavbar>

            <UDashboardToolbar>
                <UInput placeholder="Search categories..."
                        class="w-full"
                        v-model="search"
                        :ui="{ icon: { trailing: { pointer: '' } } }">
                    <template #trailing>
                        <UButton v-show="search.length > 0"
                                 :padded="false"
                                 variant="link"
                                 color="gray"
                                 icon="i-heroicons-x-mark"
                                 @click="search = ''"/>
                    </template>
                </UInput>
            </UDashboardToolbar>

            <UDashboardSidebar>
                <UDashboardSidebarLinks :links="links"/>

                <template #footer>
                    <div class="flex justify-between w-full items-center gap-2.5">
                        <span class="text-sm font-semibold">Copyright &copy; {{ new Date().getFullYear() }}</span>

                        <UTooltip text="Source code">
                            <UButton icon="i-simple-icons-github"
                                     color="gray"
                                     variant="ghost"
                                     to="https://github.com/tasty-berries"
                                     target="_blank"/>
                        </UTooltip>
                    </div>
                </template>
            </UDashboardSidebar>
        </UDashboardPanel>

        <slot/>
    </UDashboardLayout>
</template>

<style scoped>

</style>