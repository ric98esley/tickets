<script setup lang="ts">
const statusStore = useStatusStore()
const route = useRoute()
const router = useRouter()

const filters = reactive(route.query)

watch(filters, async (query) => {
  router.push({
    path: '/status',
    query: {
      id: query.id || undefined,
      name: query.name || undefined,
      color: query.color || undefined
    }
  })
  statusStore.getStatus(query)
}, { deep: true })


onMounted(() => {
  if (route.query.page) {
    statusStore.page = Number(route.query.page)
  }

  if (route.query.limit) {
    statusStore.limit = Number(route.query.limit)
  }

  statusStore.getStatus(route.query)
})
</script>

<template>
  <UContainer>
    Status del Sistema
    <StatusTable :data="statusStore.status" :total="statusStore.totalPages" v-model:filters="filters"
      v-model:limit="statusStore.limit" v-model:page="statusStore.page" />
  </UContainer>
</template>