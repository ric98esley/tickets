<script lang="ts" setup>
import { GroupModal } from '#components';
import type { FindGroup, Group } from '~/types/groups';
import ConfirmModal from '../ConfirmModal.vue';
const modal = useModal()

const props = defineProps(
  {
    data: {
      type: Array as PropType<Group[]>,
    },
    total: {
      type: [Number, String],
      default: 0,
    },
    filters: {
      type: Object as PropType<FindGroup>,
      default: () => ({
        id: '',
        name: '',
        limit: 10,
        page: 1,
      }),
    },
  }
)

const emit = defineEmits(['refresh', 'update:filters'])

const columns = [
  {
    key: 'name',
    label: 'Nombre'
  },
  {
    key: 'code',
    label: 'Código'
  },
  {
    key: 'manager.name',
    label: 'Encargado'
  },
  {
    key: 'actions',
    label: 'Acciones'
  }
]

const items = (row: Group) => [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      modal.open(GroupModal, {
        group: row,
        onSubmit: async (data) => {
          await useUpdateGroup(row.id, data)
          emit('refresh')
        }
      })
    }
  }, {
    label: 'Eliminar',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
      modal.open(ConfirmModal, {
        title: 'Eliminar',
        message: '¿Estás seguro de eliminar este grupo?',
        onSubmit: async () => {
          await useDeleteGroup(row.id)
          emit('refresh')
        }
      })
    }
  }],
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