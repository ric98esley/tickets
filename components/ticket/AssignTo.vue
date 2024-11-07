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

const assignedTo = ref<User | null>()

const state = reactive({
  assignedTo: props.assignedTo || '',
  department: '',
})

const handlerAssignedTo = async (value: User | null | undefined) => {
  if (!props.ticket) return
  await useUpdateTicket(props.ticket, { assignedTo: state.assignedTo })
  const message = `El usuario ${user.user?.username} ${value ? `ha asignado el ticket a ${value.name}` : 'ha desasignado el ticket'}`
  await useCreateThread({
    ticket: props.ticket,
    content: message,
  })
}

const handlerSelect = (value: User | null) => {
  console.log(value)
  assignedTo.value = value
  state.department = value?.departments?.[0].id || ''

}

const handlerSubmit = async () => {
  await handlerAssignedTo(assignedTo.value)
  emit('submit', assignedTo)
  modal.close()
}
</script>

<template>
  <UModal prevent-close>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h3>Asignar a</h3>
          <UButton @click="modal.close()" icon="i-heroicons-x-mark-16-solid" variant="link" />
        </div>
      </template>
      <UForm :state="state" class="space-y-4">
        <UFormGroup name="assignedTo" label="Asignar a">
          <UserSelect v-model="state.assignedTo" @handle-select="handlerSelect" />
        </UFormGroup>
        <UFormGroup v-if="assignedTo" name="department" label="Departamento">
          <DepartmentSelect v-model="state.department" />
        </UFormGroup>
        <UButton @click="handlerSubmit">Guardar</UButton>
      </UForm>
    </UCard>
  </UModal>
</template>