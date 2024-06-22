<script setup lang="ts">

const route = useRoute()
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
}]

const emit = defineEmits(['update:filters'])

const filters = computed({
  get: () => props.filters,
  set: (value) => emit('update:filters', value)
})

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
        <UInput v-model="filters.color" placeholder="Color" class="w-24" />
      </template>
      <template #color-data="{ row }">
        <UBadge size="sm"
          :style="{ ['background-color']:  row.color }">
          {{ row.color }}
        </UBadge>
      </template>
    </UTable>
    <Pagination :total="props.total" v-model:limit="filters.limit" v-model:page="filters.page" />
  </div>
</template>