<script setup lang="ts">
import { DepartmentSelect } from '#components';
import type { Department } from '~/types';

const user = useUserStore()

const modal = useModal()
const props = defineProps({
  department: {
    type: String,
  },
  ticket: {
    type: String,
  },
})
const emit = defineEmits(['submit'])

const department = ref<Department | null>()

const state = reactive({
  department: props.department || '',
})

const handlerSubmit = async () => {
  if (department.value) {
    if (!props.ticket) return
    await useUpdateTicket(props.ticket, { department: state.department })
    await useCreateThread({
      ticket: props.ticket,
      content: `El usuario ${user.user?.username} ha transferido el ticket al departamento ${department.value.name}`,
    })
  }
  emit('submit', department)
  modal.close()
}
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h3>Transferir ticket</h3>
          <UButton @click="modal.close()" icon="i-heroicons-x-mark-16-solid" variant="link" />
        </div>
      </template>
      <UForm :state="state" class="space-y-4">
        <UFormGroup name="assignedTo" label="Transferir a">
          <DepartmentSelect v-model="state.department" @handle-select="(value) => department = value" />
        </UFormGroup>
        <UButton @click="handlerSubmit">Guardar</UButton>
      </UForm>
    </UCard>
  </UModal>
</template>