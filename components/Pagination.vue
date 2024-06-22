<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const props = defineProps({
  total: {
    type: [Number, String],
    default: 0,
  },
  limit: {
    type: [Number, String],
    default: 10,
  },
  page: {
    type: [Number, String],
    default: 1,
  },
})

const emit = defineEmits(['update:page', 'update:limit'])

const page = computed({
  get: () => props.page,
  set: (value) => emit('update:page', value),
})

const limit = computed({
  get: () => props.limit,
  set: (value) => emit('update:limit', value),
})

const limits = [2, 10, 20, 50, 100]

</script>

<template>
  <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
    <USelect v-model="limit" :options="limits" />
    <UPagination v-model="page" :total="props.total" />
  </div>
</template>