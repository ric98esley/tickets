<script lang="ts" setup>
import type { Zone } from '~/types/zones';

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

</script>

<template>
  <UContainer>
    <UTable :rows="props.data" :columns="columns">
      <template #actions-data="{ row }">
        <UDropdown>
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </UContainer>
</template>