<script lang="ts" setup>
import type { Zone } from '~/types/zones';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const loading = ref(false)


const emit = defineEmits(['update:modelValue', 'handleSelect'])

const zone = ref<Zone | undefined>(undefined)

const zones = reactive<{ rows: Zone[] }>({ rows: [] })

const getZones = async () => {
  const res = await useFindZones()
  zones.rows = res.rows
}

const searchZone = async (query: string) => {
  const res = zones.rows.filter((zone) => zone.name.toLowerCase().includes(query.toLowerCase()))
  return res
}

watch(zone, (value) => {
  if (value) {
    emit('update:modelValue', value.id)
    emit('handleSelect', value)
  }
}, { deep: true })

onMounted(async () => {
  await getZones()
  if (props.modelValue) {
    zone.value = zones.rows.find((zone) => zone.id === props.modelValue)
  }
})
</script>

<template>
  <USelectMenu name="zone" v-model="zone" :loading="loading" :searchable="searchZone" option-attribute="name"
    placeholder="Busca una zona..." searchablePlaceholder="Busca por nombre de departamento">
    <template #option="{ option }">
      <div class="flex items-center">
        <div>
          <div class="font-bold">{{ option.name }}</div>
        </div>
      </div>
    </template>
  </USelectMenu>
</template>