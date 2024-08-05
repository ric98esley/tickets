<script setup lang="ts">
import type { User } from '~/types';
const modal = useModal()

const user = useUserStore()

const props = defineProps({
  ticket: {
    type: String,
  },
  assignedTo: {
    type: String,
  }
})

const emit = defineEmits(['submit'])

const assignedTo = ref<User>()

const state = reactive({
  assignedTo: props.assignedTo || '',
})

const handlerAssignedTo = async (value: User) => {
  if(!props.ticket) return
  await useUpdateTicket(props.ticket, { assignedTo: state.assignedTo })
  await useCreateThread({
    ticket: props.ticket,
    content: `El usuario ${user.user?.username} ha asignado el ticket a ${value.name}`,
  })
}

const handlerSubmit = async () => {
  if (assignedTo.value) {
    await handlerAssignedTo(assignedTo.value)
  }
  emit('submit', assignedTo)
  modal.close()
}
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h3>Asignar a</h3>
          <UButton @click="modal.close()" icon="i-heroicons-x-mark-16-solid" variant="link" />
        </div>
      </template>
      <UForm :state="state" class="space-y-4">
        <UFormGroup name="assignedTo" label="Asignar a">
          <UserSelect v-model="state.assignedTo" @handle-select="(value) => assignedTo = value" />
        </UFormGroup>
        <UButton @click="handlerSubmit">Guardar</UButton>
      </UForm>
    </UCard>
  </UModal>
</template>