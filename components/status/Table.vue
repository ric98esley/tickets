<script setup lang="ts">

const route = useRoute()
const props = defineProps({
  data: {
    type: Array as PropType<Status[]>,
    default: () => ([]),
  },
  filters: {
    type: Object as PropType<StatusFilters>,
    default: () => ({
      id: '',
      name: '',
      color: ''
    }),
  },
  page: {
    type: [Number, String],
    default: 1,
  },
  total: {
    type: [Number, String],
    default: 0,
  },
  limit: {
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

const emit = defineEmits(['update:page', 'update:limit', 'update:filters'])


const limit = ref('10')

const filters = computed({
  get: () => props.filters,
  set: (value) => emit('update:filters', value)
})

</script>

<template>
  <div>
    <UTable :rows="data" :columns="columns">
      <template #id-header>
        <UInput v-model="filters.id" placeholder="ID" />
      </template>
      <template #name-header>
        <UInput v-model="filters.name" placeholder="Nombre" />
      </template>
      <template #color-header>
        <UInput v-model="filters.color" placeholder="Color" />
      </template>
    </UTable>
    <Pagination :total="props.total" />
  </div>
</template>