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

const viewAccepted = useCookie<boolean | undefined>(
    'viewAccepted',
    {default: () => undefined, expires: new Date(Date.now() + 24 * 3600 * 365 * 1000)}
);

const adultSettingsShown = ref<boolean>(viewAccepted.value === undefined);
</script>

<template>
    <NuxtLoadingIndicator/>

    <UModal v-model="adultSettingsShown" prevent-close>
        <UCard :ui="{ring: ''}">
            <template #header>
                <h3 class="font-semibold text-lg">Attention!</h3>
            </template>

            <p>
                The site contains adult materials. If you are not ready to view such content, please close the site.
                All responsibility for possible problems during and after viewing remains solely with you.
            </p>

            <template #footer>
                <div class="flex gap-2.5 justify-end">
                    <UButton color="gray"
                             label="Okay, let's go!"
                             @click="viewAccepted = true; adultSettingsShown = false;"/>

                    <UButton color="red"
                             label="No, thanks"
                             tabindex="1"
                             @click="viewAccepted = false; adultSettingsShown = false;"/>
                </div>
            </template>
        </UCard>
    </UModal>

    <UDashboardLayout>
        <UDashboardPanel :width="300" :resizable="{ min: 200, max: 400 }" collapsible>
            <UDashboardNavbar>
                <template #title>
                    <NuxtLink to="/">Berry Hub</NuxtLink>
                </template>

                <template #right>
                    <UColorModeButton/>

                    <UTooltip text="Adult settings">
                        <UButton icon="i-uil-18-plus"
                                 variant="ghost"
                                 color="gray"
                                 @click="adultSettingsShown = true"/>
                    </UTooltip>
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