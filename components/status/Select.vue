<script setup lang="ts">
import type { Status } from '~/types';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const status = ref<Status | undefined>(undefined)

const loading = ref(false)


const searchStatus = async (query: string) => {
  loading.value = true
  const statuses = await useFindStatus({ name: query })
  loading.value = false
  return statuses.rows
}

watch(status, (value) => {
  if (value) {
    emit('update:modelValue', value.id)
  }
})
</script>
<template>
  <USelectMenu name="status" v-model="status" :loading="loading" :searchable="searchStatus"
    placeholder="Busca un status..." option-attribute="name" trailing by="id">
  </USelectMenu>
</template>