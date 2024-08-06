<script setup lang="ts">
import type { Route, RouteCreate, RouteFind } from '~/types';

const route = useRoute()

const modals = reactive({
  add: false
})

const filters = reactive<RouteFind>({
  id: route.query.id as string || undefined,
  name: route.query.name as string || undefined,
  limit: Number(route.query.limit) || 10,
  page: Number(route.query.page) || 1
})

const routes = reactive<{
  rows: Route[],
  total: number
}>({
  rows: [],
  total: 0
})

const getRoutes = async () => {
  const data = await useFindRoutes()
  routes.rows = data.rows
  routes.total = data.total
}

const handlerSubmit = async (data: RouteCreate) => {
  const response = await useCreateRoute(data)
  if (!response) return
  for (const ticket of data.tickets) {
    await useUpdateTicket(ticket.id, { route: response.id, assignedTo: data.assignedTo })
  }

  await getRoutes()
}

onMounted(async () => {
  await getRoutes()
})
</script>
<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h1 class="text-2xl font-bold">Rutas</h1>
          <div class="flex flex-col md:flex-row gap-2">
            <UButton @click="modals.add = true" color="primary">Nueva Ruta</UButton>
          </div>
        </div>
      </template>
      <RoutesTable :data="routes.rows" :total="routes.total" :filters="filters" @refresh="getRoutes()" />
    </UCard>
    <UModal v-model="modals.add" @close="modals.add = false" prevent-close>
      <UCard>
        <template #header>
          <div class="flex justify-between">
            <h1 class="text-2xl font-bold">Nueva Ruta</h1>
            <UButton @click="modals.add = false" icon="i-heroicons-x-mark-16-solid" variant="link" />
          </div>
        </template>
        <template #default>
          <RoutesSave @submit="handlerSubmit" />
        </template>
      </UCard>
    </UModal>
  </UContainer>
</template>