<script setup lang="ts">
import type { TicketResolve } from '~/types';

const props = defineProps({
  ticket: {
    type: String,
  },
})

const emit = defineEmits(['submit'])

const modal = useModal()

const resolveTicket = async (id: string, data: TicketResolve) => {
  if (!data.content) {
    const toast = useToast()
    toast.add({ color: 'red', title: 'El contenido es requerido' })
    return
  }
  if (!id) return
  const ticket = await useUpdateTicket(id, { isClosed: true, closedAt: new Date() })
  if (data.content && data.content !== "<p></p>" && ticket?.id) {
    await useCreateThread({
      ticket: ticket.id,
      content: data.content,
    })
    await useCreateThread({
      ticket: ticket.id,
      content: `El ticket ha sido resuelto por ${ticket.assignedTo?.name}`,
    })
  }
}

const handlerSubmit = async (data: TicketResolve) => {
  if(props.ticket) await resolveTicket(props.ticket, data)
  emit('submit', data)
  modal.close()
}

</script>

<template>
  <UModal title="Resolver ticket" prevent-close>
    <UCard>
      <template #header>
        <div class="text-lg font-semibold flex justify-between">
          <h2>Resolver ticket</h2>
          <UButton @click="modal.close()" icon="i-heroicons-x-mark-16-solid" variant="link" />
        </div>
      </template>
      <TicketResolve @submit="handlerSubmit" />
    </UCard>
  </UModal>
</template>