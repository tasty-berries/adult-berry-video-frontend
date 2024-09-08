<script setup lang="ts">
defineProps<{
    src: string,
    wrapper?: any
}>();

defineOptions({
    inheritAttrs: false
});

const viewAccepted = useCookie<boolean | undefined>(
    'viewAccepted',
    {default: () => undefined, expires: new Date(Date.now() + 24 * 3600 * 365 * 1000)}
);
</script>

<template>
    <div class="overflow-hidden" v-bind="wrapper">
        <img :src="src"
             class="w-full h-full"
             :class="{blur: !viewAccepted}"
             v-bind="$attrs"/>
    </div>
</template>

<style scoped>

</style>