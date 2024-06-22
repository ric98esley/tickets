<script setup lang="ts">
const statusStore = useStatusStore()
const route = useRoute()
const router = useRouter()

const filters = reactive({
  id: route.query.id || undefined,
  name: route.query.name || undefined,
  color: route.query.color || undefined,
  limit: Number(route.query.limit) || 10,
  page: Number(route.query.page) || 1
})

watch(filters, async (data) => {
  const query = { ...data }

  router.push({
    path: '/status',
    query
  })
  statusStore.getStatus(data)
})

onMounted(() => {
  statusStore.getStatus(filters)
})
</script>

<template>
  <UContainer>
    Status del Sistema
    <StatusTable :data="statusStore.status" :total="statusStore.totalPages" v-model:filters="filters" />
  </UContainer>
</template>