<script setup lang="ts">
import type { Route, RouteFind } from '~/types';

const route = useRoute()

const modals = reactive({
  add: false
})

const filters = reactive <RouteFind> ({
  id: route.query.id as string || undefined,
  name: route.query.name as string || undefined,
  limit: Number(route.query.limit)  || 10,
  page: Number(route.query.page) || 1
})


const routes = reactive < {
  rows: Route[],
  total: number
} > ({
  rows: [],
  total: 0
})

const getRoutes = async (page = 1) => {
  const data = await useFindRoutes()
  routes.rows = data.rows
  routes.total = data.total

  console.log(data.rows)
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
      <RoutesTable :data="routes.rows" :total="routes.total" :filters="filters" />
    </UCard>
  </UContainer>
</template>