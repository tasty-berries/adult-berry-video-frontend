<script setup lang="ts">
defineProps<{
    src: string,
    wrapper?: any
}>();

defineOptions({
    inheritAttrs: false
});

const viewAccepted = useCookie<boolean | undefined>('viewAccepted', {default: () => undefined});
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