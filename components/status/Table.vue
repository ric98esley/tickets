<script setup lang="ts">
const route = useRoute()
const statusStore = useStatusStore()

const props = defineProps({
  data: {
    type: Array as PropType<Status[]>,
    default: () => ([]),
  },
  filters: {
    type: Object as PropType<StatusFind>,
    default: () => ({
      id: '',
      name: '',
      color: '',
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
  key: 'color',
  label: 'Color'
},
{
  key: 'actions',
  label: 'Acciones'
}]

const modals = reactive({
  edit: false
})

const statusToEdit = ref<Status | null>(null)

const emit = defineEmits(['update:filters', 'refresh'])

const filters = computed({
  get: () => props.filters,
  set: (value) => emit('update:filters', value)
})

const deleteStatus = async (row: Status) => {
  await statusStore.deleteStatus(row)
  emit('refresh')
}

const updateStatus = async (data: StatusUpdate) => {
  await statusStore.updateStatus({
    id: statusToEdit.value.id,
    name: data.name,
    color: data.color.toUpperCase()
  })
  modals.edit = false
  emit('refresh')
}

const items = (row: Status) => [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      statusToEdit.value = row
      statusToEdit.value = row
      modals.edit = true
    }
  },], [{
    label: 'Borrar',
    icon: 'i-heroicons-trash-20-solid',
    click: () => deleteStatus(row)
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
      <template #color-header>
        <UInput v-model="filters.color" placeholder="Color" />
      </template>
      <template #color-data="{ row }">
        <UBadge size="sm" :style="{ ['background-color']: row.color }">
          {{ row.color }}
        </UBadge>
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <Pagination :total="props.total" v-model:limit="filters.limit" v-model:page="filters.page" />
    <UModal v-model="modals.edit">
      <UCard class="p-4">
        <template #header>
          Editar Status: {{ statusToEdit?.name }}
        </template>
        <StatusForm @submit="updateStatus" :form="statusToEdit" />
      </UCard>
    </UModal>
  </div>
</template>