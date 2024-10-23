<script lang="ts" setup>
import type { Zone, ZoneCreate } from '~/types/zones';


const zones = reactive<{ total: number, rows: Zone[] }>({
  total: 0,
  rows: []
})

const modals = reactive<{ create: boolean }>({
  create: false
})

const getZones = async () => {
  const { rows, total } = await useFindZones()

  zones.rows = rows
  zones.total = total
}

const submit = async (data: ZoneCreate) => {
  await useCreateZone(data)
  await getZones()
  modals.create = false
}

onMounted(async () => {
  await getZones()
})

</script>


<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="flex">
          <h1 class="text-2xl font-bold">Zonas</h1>
          <UButton @click="modals.create = true" class="ml-auto">Crear</UButton>
        </div>
      </template>
      <ZoneTable :data="zones.rows" :total="zones.total" @refresh="getZones" />
    </UCard>
    <UModal v-model="modals.create">
      <UCard class="p-4">
        <template #header>
          <h1 class="text-2xl font-bold">Crear Zona</h1>
        </template>
        <ZoneForm @submit="submit" />
      </UCard>
    </UModal>
  </UContainer>
</template>