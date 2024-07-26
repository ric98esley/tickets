<script setup lang="ts">
import type { User, UserFind } from '~/types';


const props = defineProps({
  data: {
    type: Array as PropType<User[]>,
    required: true
  },
  filters: {
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


</script>

<template>
  <UContainer>
    <UTable :rows="props.data" :columns="columns">

    </UTable>
  </UContainer>
</template>