<script lang="ts" setup>
import { AgentsModal } from '#components';
import type { Agent, AgentCreate, AgentFind } from '~/types/agents';

const modal = useModal()

const props = defineProps({
  data: {
    type: Array as PropType<Agent[]>,
    default: () => ([]),
  },
  filters: {
    type: Object as PropType<AgentFind>,
    default: () => ({
      id: '',
      name: '',
      limit: 10,
      page: 1,
    }),
  },
  total: {
    type: [Number, String],
    default: 0,
  },
})

const emit = defineEmits(['update:filters', 'refresh'])

const columns = [
  {
    key: 'name',
    label: 'Nombre',
  },
  {
    key: 'code',
    label: 'Código',
  },
  {
    key: 'inChargeOf',
    label: 'Encargado',
  },
  {
    key: 'group.code',
    label: 'Grupo',
  },
  {
    key: 'zone.name',
    label: 'Zona',
  },
  {
    key: 'phone',
    label: 'Teléfono',
  },
  {
    key: 'actions',
    label: 'Acciones',
  },
]

const items = (row: Agent) => [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-20-solid',
    click: () => {
      modal.open(AgentsModal, {
        form: {
          name: row.name,
          code: row.code,
          phone: row.phone,
          address: row.address,
          inChargeOf: row.inChargeOf,
          group: row.group?.id || '',
          zone: row.zone?.id || '',
          facade: row.facade,
        },
        onSubmit: async (data: AgentCreate) => {
          await useUpdateAgent(row.id, data);
          emit('refresh');
        },
      })
    },
  },
  {
    label: 'Eliminar',
    icon: 'i-heroicons-trash-20-solid',
    onClick: () => console.log('Delete', row),
  },]
]

</script>

<template>
  <div>
    <UTable :rows="props.data" :columns="columns">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <Pagination :total="props.total" v-model:limit="filters.limit" v-model:page="filters.page" />
  </div>
</template>
