<script lang="ts" setup>
import { ZoneModal } from '#components';
import type { Zone } from '~/types/zones';
const modal = useModal()

const props = defineProps({
  data: {
    type: Array as PropType<Zone[]>,
    required: true
  },
  total: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['refresh'])

const columns = [
  {
    key: 'name',
    label: 'Ruta'
  },
  {
    key: 'actions',
    label: 'Acciones',
    align: 'right'
  }
]

const items = (row: Zone) => [[
  {
    label: 'Editar',
    icon: 'i-heroicons-pencil-20-solid',
    click: () => {
      modal.open(ZoneModal, {
        data: row,
        onSubmit: async (data: Zone) => {
          await useUpdateZone(row.id,data)
          emit('refresh')
        }
      })
    }
  }
],
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
  </div>
</template>