<script setup lang="ts">
import type { StatusCreate } from '~/types';

const statusStore = useStatusStore()
const route = useRoute()
const router = useRouter()

const filters = reactive({
  id: route.query.id as string || undefined,
  name: route.query.name as string || undefined,
  color: route.query.color as string || undefined,
  limit: Number(route.query.limit) || 10,
  page: Number(route.query.page) || 1
})

const modals = reactive({
  create: false
})

const createStatus = async (data: StatusCreate) => {
  await statusStore.createStatus({
    name: data.name,
    color: data.color.toUpperCase()
  })

  statusStore.getStatus(filters)
  modals.create = false
}

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
    <UCard>
      <template #header>
        <div class="flex">
          <h1 class="text-2xl font-bold">Status del Sistema</h1>
          <UButton @click="modals.create = true" class="ml-auto">Crear</UButton>
        </div>
      </template>
      <StatusTable
        :data="statusStore.status"
        :total="statusStore.totalPages"
        v-model:filters="filters"
        @refresh="statusStore.getStatus(filters)" />
    </UCard>
    <UModal v-model="modals.create">
      <UCard class="p-4">
        <template #header>
          Guardar Status
        </template>
        <StatusForm @submit="createStatus" />
      </UCard>
    </UModal>
  </UContainer>
</template>