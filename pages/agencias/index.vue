<script lang="ts" setup>
import type { Agent } from '~/types/agents';

const agents = reactive<{
  rows: Agent[]
  total: number
}>({
  rows: [],
  total: 0
})

const getAgents = async () => {
  const data = await useFindAgents({})

  agents.rows = data.rows
  agents.total = data.total
}

onMounted(() => {
  getAgents()
})


</script>

<template>
  <UContainer>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold">Agencias</h1>
      <UButton icon="i-heroicons-plus-20-solid">
        Agregar
      </UButton>
    </div>
    <AgentsTable :data="agents.rows" :total="agents.total" />
  </UContainer>
</template>