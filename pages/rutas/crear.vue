<script setup lang="ts">
import type { RouteCreate, Ticket } from '~/types';


const task = ref(0)

const steps = [
  'Datos de la ruta',
  'Escoge los tickets',
  'Confirmar'
]

const form = ref<RouteCreate>({
  assignedTo: '',
  started: '',
  zone: '',
  tickets: []
})

const ticketByZone = ref<Ticket[]>([])

const getTickets = async () => {
  const data = await useFindAllByZoneId({
    zoneId: form.value.zone,
    isClosed: false
  })

  ticketByZone.value = data
}

const next = () => {
  task.value += 1
}

const handlerFormSubmit = async (data: RouteCreate) => {
  if (!data.zone) return;
  console.log(data)


  form.value = data
  await getTickets()

  next()
}

const handlerTableSubmit = () => {
  next()
}

const handlerTableSelected = (data: Ticket[]) => {
  console.log('handlerTableSelected')
  console.log(data)
  form.value.tickets = data
}

const handlerSubmit = async () => {
  const response = await useCreateRoute(form.value)
  if (!response) return
  for (const ticket of form.value.tickets) {
    await useUpdateTicket(ticket.id, { route: response.id, assignedTo: response.assignedTo?.id })
  }
}

</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h1 class="text-2xl font-bold">Crear Ruta</h1>
        </div>
      </template>
      <UProgress :value="task" :max="steps" indicator>
      </UProgress>
      <RoutesSave v-if="task == 0" :form="form" @submit="handlerFormSubmit" />
      <div v-if="task == 1">
        <TicketTable :data="ticketByZone" @refresh="getTickets" :page="1" :total="ticketByZone.length"
          @on-selected="handlerTableSelected" />
        <div class="flex space-x-2 justify-end">
          <UButton @click="task = 0" color="red">Volver</UButton>
          <UButton @click="handlerTableSubmit" color="primary">Siguiente</UButton>
        </div>
      </div>
      <div v-if="task == 2">
        <h1 class="text-2xl font-bold">Confirmar</h1>
        <div class="space-y-2">
          <div>
            <span class="font-bold">Tickets:</span>
            <ul class="space-y-2 mb-6 ">
              <li v-for="ticket in form.tickets" :key="ticket.id">
                <div>
                  <span class="font-bold">Agencia: </span>
                  <span>{{ ticket.agent?.name }}</span>
                </div>
                <div>
                  <span class="font-bold">Código: </span>
                  <span>{{ ticket.agent?.code }}</span>
                </div>
                <span class="font-bold">Contenido:</span>
                <div v-if="ticket.content" v-html="ticket.content" class="mt-4 outline-none dark:opacity-70"
                  tabindex="0">
                </div>
                <UDivider />
              </li>
            </ul>
          </div>
        </div>
        <div class="flex space-x-2">
          <UButton @click="task = 1" color="red">Volver</UButton>
          <UButton @click="handlerSubmit()" color="primary">Guardar</UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>