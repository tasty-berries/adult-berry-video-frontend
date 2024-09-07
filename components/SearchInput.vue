<script setup lang="ts">
defineProps<{
    loading?: boolean
}>();

const model = defineModel<string>({required: true});
</script>

<template>
    <UInput placeholder="Search..."
            class="w-full"
            v-model="model"
            :ui="{ icon: { trailing: { pointer: '' } } }">
        <template #trailing>
            <UIcon v-show="loading"
                   name="i-heroicons-arrow-path"
                   class="animate-spin"/>

            <UButton v-show="!loading && model.length > 0"
                     :padded="false"
                     variant="link"
                     color="gray"
                     icon="i-heroicons-x-mark"
                     @click="model = ''"/>
        </template>
    </UInput>
</template>

<style scoped>

</style>