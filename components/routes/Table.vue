<script setup lang="ts">
import { RoutesSaveModal } from '#components';
import type { Route, RouteCreate, RouteFind } from '~/types';

const modal = useModal()

const props = defineProps({
  data: {
    type: Array as PropType<Route[]>,
    default: () => ([]),
  },
  filters: {
    type: Object as PropType<RouteFind>,
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

const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'name',
  label: 'Nombre'
}, {
  key: 'assignedTo.name',
  label: 'Asignado a'
},
{
  key: 'started',
  label: 'Inicio'
},
{
  key: 'closed',
  label: 'Fin'
},
{
  key: 'created',
  label: 'Creado'
},
{
  key: 'actions',
  label: 'Acciones'
}]

const emit = defineEmits(['update:filters', 'refresh'])

const filters = computed({
  get: () => props.filters,
  set: (value) => emit('update:filters', value)
})

const items = (row: Route) => [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      modal.open(RoutesSaveModal, {
        form: {
          name: row.name,
          assignedTo: row.assignedTo?.id ?? '',
          started: row.started.toString() ?? '',
          tickets: row.tickets
        },
        onSubmit: async (data: RouteCreate) => {
          await useUpdateRoute(row.id, data)
          emit('refresh')
          modal.close()
        }
      })
    }
  }, {
    label: 'Ver',
    icon: 'i-heroicons-eye-20-solid',
    click: () => {
      navigateTo(`/rutas/${row.id}`)
    }
  }], [{
    label: 'Terminar',
    icon: 'i-heroicons-check-circle-20-solid',
    click: async () => {
      await useUpdateRoute(row.id, { closed: new Date().toISOString() })
      emit('refresh')
    }
  }]
]
</script>

<template>
  <div>
    <UTable :rows="data" :columns="columns">
      <template #id-header>
        <UInput v-model="filters.id" placeholder="ID" class="w-36" />
      </template>
      <template #name-header>
        <UInput v-model="filters.name" placeholder="Nombre" />
      </template>
      <template #assignedTo.name-header>
        <UInput v-model="filters.assignedTo" placeholder="Asignado a" />
      </template>
      <template #color-data="{ row }">
        <UBadge size="sm" :style="{ ['background-color']: row.color }">
          {{ row.color }}
        </UBadge>
      </template>
      <template #created-data="{ row }">
        {{ dateFormattedWithTime(row.created) }}
      </template>
      <template #started-data="{ row }">
        {{ row.started ? dateFormatted(row.started): 'No iniciado' }}
      </template>
      <template #closed-data="{ row }">
        {{ row.closed ? dateFormatted(row.closed) : 'No finalizado' }}
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <Pagination :total="props.total" v-model:limit="filters.limit" v-model:page="filters.page" />
  </div>
</template>