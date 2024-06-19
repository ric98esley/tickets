<script setup lang="ts">
import type { Ticket } from "~/types";

const props = defineProps({
  data: {
    type: Array as PropType<Ticket[]>,
    required: true
  },
  total: {
    type: Number,
    default: 0
  },
  limit: Number,
  page: {
    type: Number,
    default: 1
  }
})

const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'customerName',
  label: 'Nombre Cliente'
}, {
  key: 'status',
  label: 'Estatus'
}, {
  key: 'createdAt',
  label: 'Creado el'
}]

const emits = defineEmits(["update:page"])

const page = computed({
  get: () => props.page,
  set: (value: number | undefined) => emits("update:page", value)
})

</script>

<template>
  <UContainer >
    <UTable :rows="props.data" :columns="columns">
      
    </UTable>
    <UPagination v-model="page" :total="props.total" :page-count="props.limit" />
  </UContainer>
</template>