<script setup lang="ts">
import type { Department } from '~/types';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  filterBy: {
    type: Function as unknown as () => (value: Department) => boolean,
    default: async (value: Department) => true,
  }
})

const emit = defineEmits(['update:modelValue', 'handleSelect'])

const selected = ref<Department | undefined>()

const loading = ref(false)

const searchDepartments = async (query: string) => {
  loading.value = true
  const departments = await useFindDepartments({ name: query, limit: 200 })

  loading.value = false
  return departments.rows.filter(props.filterBy)
}

watch(selected, (value) => {
  if (value) {
    emit('update:modelValue', value.id)
    emit('handleSelect', value)
  }
})

watch(() => props.modelValue, async (value) => {
  if (value) {
    selected.value = await useFindOneDepartment(value)
  }
})

onMounted(async () => {
  if (props.modelValue) {
    selected.value = await useFindOneDepartment(props.modelValue)
  }
})
</script>

<template>
  <USelectMenu name="department" v-model="selected" :loading="loading" :searchable="searchDepartments"
    placeholder="Busca un departamento..." searchablePlaceholder="Busca por nombre de departamento"
    option-attribute="name">
    <template #option="{ option }">
      <div class="flex items-end justify-between w-80">
        <span class="font-bold">{{ option.name }}</span>
      </div>
    </template>
  </USelectMenu>
</template>