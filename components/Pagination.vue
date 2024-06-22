<script setup lang="ts">
const router = useRouter()

const props = defineProps({
  total: {
    type: [Number, String],
    default: 0,
  },
  limit: {
    type: [Number, String],
    default: 0,
  },
})

const page = ref(1)

const limit = ref('10')
const limits = ['2', '10', '20', '50', '100']

watch(limit, (value) => {
  router.push({
    query: { page: page.value, limit: limit.value }
  })
})

</script>

<template>
  <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
    <USelect v-model="limit" :options="limits" />
    <UPagination v-model="page" :total="props.total" :to="(page: number) => ({
      query: { page, limit }
    })" />
  </div>
</template>