<script setup lang="ts">
import type { User } from '~/types';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'handleSelect'])

const user = ref<User | undefined>(undefined)

const loading = ref(false)


const searchUsers = async (query: string) => {
  loading.value = true
  const users = await useFindUser({ name: query, username: query })
  loading.value = false
  return users.rows
}

watch(user, (value) => {
  if (value) {
    emit('update:modelValue', value.id)
    emit('handleSelect', value)
  }
  if (!value) {
    emit('update:modelValue', undefined)
    emit('handleSelect', undefined)
  }
}, { deep: true })

onMounted(async () => {
  if (props.modelValue) {
    user.value = await useFindOneUser(props.modelValue) || undefined
  }
})
</script>
<template>
  <div class="flex w-full justify-between">
    <USelectMenu name="status" v-model="user" class="w-10/12":loading="loading" :searchable="searchUsers"
      placeholder="Busca un usuario..." option-attribute="name" trailing by="id">
      <template #option="{ option }">
        <div class="flex items-center">
          <UAvatar size="xs" :src="option.avatar" class="mr-2" />
          <div>
            <div class="font-bold">{{ option.name }}</div>
            <div class="text-sm text-gray-500">{{ option.username }}</div>
          </div>
        </div>
      </template>
    </USelectMenu>
    <UButton @click="user = undefined" size="xs" square type="ghost" icon="i-heroicons-arrow-path-rounded-square-16-solid" />
  </div>
</template>