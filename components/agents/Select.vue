<script lang="ts" setup>
import type { Agent } from '~/types/agents';


const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

const agent = ref<Agent | undefined>(undefined);

const loading = ref(false);

const agents = reactive<{
  rows: Agent[];
  total: number;
}>({
  rows: [],
  total: 0,
});;


const getAgents = async (query: string) => {
  loading.value = true;
  const res = await useFindAgents({ limit: 20, query });
  loading.value = false;

  return res.rows;
};



</script>

<template>
  <USelectMenu name="agent" v-model="agent" :loading="loading" :searchable="getAgents"
    placeholder="Busca una agencia..." searchablePlaceholder="Busca por código de agencia o nombre"
    option-attribute="name" trailing by="id">
    <template #label>
      <div v-if="agent" class="flex justify-between">
        <div class="font-bold mr-3">{{ agent.code }}</div>
        <div class="text-sm text-gray-500">{{ agent.name }}</div>
      </div>
      <div v-else class="text-gray-500">Selecciona una agencia</div>
    </template>
    <template #option="{ option }">
      <div class="flex justify-between">
        <div class="font-bold mr-3">{{ option.code }}</div>
        <div class="text-sm text-gray-500">{{ option.name }}</div>
      </div>
    </template>
  </USelectMenu>
</template>