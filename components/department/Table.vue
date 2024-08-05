<script setup lang="ts">
import type { Department, FindDepartment } from '~/types';

const props = defineProps({
  data: {
    type: Array as PropType<Department[]>,
    required: true
  },
  filters: {
    type: Object as PropType<FindDepartment>,
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
    key: 'id',
    label: 'ID'
  },
  {
    key: 'name',
    label: 'Nombre'
  },
  {
    key: 'created',
    label: 'Creado'
  },
  {
    key: 'actions',
    label: 'Acciones'
  }
]

const items = (row: Department) => [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
    }
  }, {
    label: 'Ver',
    icon: 'i-heroicons-eye-20-solid',
    click: () => {
    }
  }],
]



</script>

<template>
  <div>
    <UTable :rows="props.data" :columns="columns">
      <template #name-header>
        <UInput v-model="props.filters.name" placeholder="Nombre" />
      </template>
      <template #created-data="{ row }">
        {{ dateFormatted(row.created) }}
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