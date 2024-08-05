<script setup lang="ts">
import type { TicketCreate } from '~/types';

const createNewTicketModal = ref(false)

const handlerSubmit = async (data: TicketCreate) => {
  const toast = useToast()
  if (!data.content || data.content === "<p></p>") {
    toast.add({
      title: 'Error',
      description: 'El contenido es requerido',
      color: 'red',
    })
    return
  }
  const ticket = await useCreateTicket(data)
  if (!ticket) return;

  await useCreateThread({
    ticket: ticket.id,
    content: data.content,
  })

  await useCreateThread({
      ticket: ticket.id,
      content: `
        <p>Estado: ${ticket.status?.name}</p>
        <p>Asignado a: ${ticket.assignedTo?.name || 'Sin asignar'}</p>
        <p>Departamento: ${ticket.department?.name}</p>
      `,
    })

  toast.add({
    title: 'Ticket creado',
    description: 'El ticket ha sido creado correctamente',
    color: 'green',
  })
  createNewTicketModal.value = false
}
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <UContainer as="main" class="overflow-y-auto p-4 w-screen">
      <slot />
    </UContainer>
    <!-- Bottom-Right Corner -->
    <div class="fixed bottom-4 right-4">
      <UButton @click="createNewTicketModal = !createNewTicketModal" size="xl" square icon="i-heroicons-plus-solid"
        class="font-bold shadow-lg" />

      <UModal v-model="createNewTicketModal" title="Crear Ticket" prevent-close>
        <UCard class="w-full">
          <template #header>
            <div class="flex justify-between">
              <h2>Crear ticket</h2>
              <UButton @click="createNewTicketModal = false" icon="i-heroicons-x-mark-16-solid" variant="link" />
            </div>
          </template>
          <TicketForm @submit="handlerSubmit" />
        </UCard>
      </UModal>
    </div>
  </div>
</template>