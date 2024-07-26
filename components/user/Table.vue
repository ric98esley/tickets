<script setup lang="ts">
import type { User, UserFind } from '~/types';

const props = defineProps({
  data: {
    type: Array as PropType<User[]>,
    required: true
  },
  filters: {
    required: true,
    type: Object as PropType<UserFind>,
    default: () => ({
      limit: Number,
      page: Number,
      agentCode: String,
      assignedTo: String,
      customerName: String,
      status: String,
    })
  },
  total: {
    type: Number,
    default: 0
  },
})

const emit = defineEmits(['update:filters'])

const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'username',
    label: 'Usuario'
  },
  {
    key: 'name',
    label: 'Nombre'
  },
  {
    key: 'email',
    label: 'Correo'
  },
  {
    key: 'role.name',
    label: 'Rol'
  },
  {
    key: 'actions',
    label: 'Acciones'
  }
]

const items = (row: User) => [[
  {
    label: 'Ver',
    icon: 'i-heroicons-eye-20-solid',
    click: () => {
      navigateTo(`/usuarios/${row.id}`)
    }
  }
],
]


const filters = computed({
  get: () => props.filters,
  set: (value: UserFind) => {
    emit('update:filters', value)
  }
})

</script>

<template>
  <UContainer>
    <UTable :rows="props.data" :columns="columns">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <Pagination :total="props.total" v-model:page="filters.page" v-model:limit="filters.limit" />
  </UContainer>
</template>