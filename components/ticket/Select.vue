<script setup lang="ts">
import type { Ticket } from '~/types';

const props = defineProps({
  modelValue: {
    type: Array as () => Ticket[],
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const selected = ref<Ticket[]>([])

const loading = ref(false)


const searchTickets = async (query: string) => {
  loading.value = true
  const statuses = await useFindTickets({ agentCode: query })
  loading.value = false
  return statuses.rows
}

watch(selected, (value) => {
  if (value) {
    emit('update:modelValue', value)
  }
})

onMounted(async () => {
  if (props.modelValue) {
    const tickets = await useFindTickets({ limit: 200, isClosed: false })
    selected.value = tickets.rows
  }
})
</script>
<template>
  <USelectMenu name="status" multiple v-model="selected" :loading="loading" :searchable="searchTickets"
    placeholder="Busca un ticket..." searchablePlaceholder="Busca por código de agencia" option-attribute="name"
    trailing by="id">
    <template #option="{ option }">
      <div class="flex items-end justify-between w-80">
        <div class="flex flex-col">
          <span class="font-bold">{{ option.id }}</span>
          <span class="text-sm text-gray-500">{{ option.agentCode }}</span>
          <span class="text-sm text-gray-500">{{ dateFormattedWithTime(option.createdAt) }}</span>
          <span class="text-sm text-gray-500">{{ option.createdBy.name }}</span>
        </div>
        <span class="text-sm text-gray-500">{{ option.status.name }}</span>
      </div>
    </template>
  </USelectMenu>
</template>