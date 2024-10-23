<script lang="ts" setup>
import type { Group, GroupCreate } from '~/types/groups';

const modal = useModal()

const props = defineProps({
  group: {
    type: Object as PropType<Group>
  },
})

const form = ref<GroupCreate>({
  name: props.group?.name || '',
  code: props.group?.code || '',
  manager: props.group?.manager?.id || '',
  phone: props.group?.phone || '',
})

const emit = defineEmits(['submit'])

const handleSubmit = (data: GroupCreate) => {
  emit('submit', data)
  modal.close()
}
</script>

<template>
  <UModal @close="modal.close()">
    <UCard>
      <template #header>
        <div class="text-lg font-semibold flex justify-between">
          <h2>Grupo</h2>
          <UButton @click="modal.close()" icon="i-heroicons-x-mark-16-solid" variant="link" />
        </div>
      </template>
      <GroupForm :form="form" @submit="handleSubmit" />
    </UCard>
  </UModal>
</template>