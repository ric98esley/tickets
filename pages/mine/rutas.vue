<script setup lang="ts">
import type { Route } from '~/types';


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

</template>