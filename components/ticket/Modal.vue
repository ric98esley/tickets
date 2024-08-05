<script setup lang="ts">
import type { Ticket, TicketCreate } from '~/types';


const props = defineProps({
  data: {
    type: Object as PropType<Ticket>,
    required: true,
  },
})

const emit = defineEmits(['submit'])

const ticketToEdit = ref<TicketCreate>({
  id: props.data.id,
  customerName: props.data.customerName,
  phone: props.data.phone,
  department: props.data.department?.id ?? '',
  assignedTo: props.data.assignedTo?.id ?? '',
  status: props.data.status?.id ?? '',
  agentCode: props.data.agentCode,
  conversationId: props.data.conversationId,
  senderId: props.data.senderId,
  content: '',
})

const modal = useModal()

const handlerSubmit = (data: TicketCreate) => {
  emit('submit', data)
  modal.close()
}

</script>

<template>
  <UModal title="Editar Ticket" prevent-close>
    <UCard>
      <template #header>
        <div class="text-lg font-semibold flex justify-between">
          <h2>Editar ticket</h2>
          <UButton @click="modal.close()" icon="i-heroicons-x-mark-16-solid" variant="link" />
        </div>
      </template>
      <TicketForm :form="ticketToEdit" @submit="handlerSubmit" />
    </UCard>
  </UModal>
</template>