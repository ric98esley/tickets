<script lang="ts" setup>
import { AgentsModal } from '#components';
import type { Agent, AgentCreate, AgentFind } from '~/types/agents';

const modal = useModal()

const agents = reactive<{
  rows: Agent[]
  total: number
}>({
  rows: [],
  total: 0
})

const filters = reactive<AgentFind>({
  name: '',
  code: '',
  phone: '',
  address: '',
  inChargeOf: '',
  group: '',
  zone: '',
  limit: 10,
  page: 1
})

const getAgents = async () => {
  const data = await useFindAgents({})

  agents.rows = data.rows
  agents.total = data.total
}

onMounted(() => {
  getAgents()
})

const create = () => {
  modal.open(AgentsModal, {
    onSubmit: async (data: AgentCreate) => {
      await useCreateAgent(data)
      await getAgents()
    }
  })
}


</script>

<template>
  <UContainer>
    <UCard>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Agencias</h1>
        <UButton @click="create" icon="i-heroicons-plus-20-solid">
          Agregar
        </UButton>
      </div>
      <AgentsTable :data="agents.rows" :total="agents.total" @refresh="getAgents" :filters="filters" />
    </UCard>
  </UContainer>
</template>