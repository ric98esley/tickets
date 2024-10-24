<script lang="ts" setup>
import type { Group } from '~/types/groups';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'handleSelect'])

const loading = ref(false)

const group = ref<Group | undefined>(undefined)

const searchGroups = async (query: string) => {
  const res = await useFindGroup({
    query: query,
    limit: 20,
  })

  return res.rows
}

watch(group, (value) => {
  if (value) {
    emit('update:modelValue', value.id)
    emit('handleSelect', value)
  }
}, { deep: true })

onMounted(() => {
  if (props.modelValue) {
    loading.value = true
    useFindOneGroup(props.modelValue).then((res) => {
      group.value = res
      loading.value = false
    })
  }
})

</script>

<template>
  <USelectMenu name="group" v-model="group" :loading="loading" :searchable="searchGroups" option-attribute="code"
    placeholder="Busca un grupo..." searchablePlaceholder="Busca por nombre o código">
    <template #option="{ option }">
      <div class="flex items-center">
        <div>
          <div class="font-bold">{{ option.name }} - {{ option.code }}</div>
        </div>
      </div>
    </template>
  </USelectMenu>
</template>