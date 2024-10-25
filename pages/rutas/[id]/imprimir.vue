<script setup lang="ts">
import type { Route, Ticket } from '~/types';

definePageMeta({
  layout: 'print'
})

const route = useRoute()

const serviceRoute = reactive<{
  route: Route | undefined,
  tickets: Ticket[]
}>({
  route: undefined,
  tickets: []
})

const getTickets = async () => {
  const res = await useFindAllTicketByRoute(String(route.params.id))

  serviceRoute.tickets = res
}

const getRoute = async () => {
  const res = await useFindOneRoute(String(route.params.id))

  serviceRoute.route = res
}


onMounted(async () => {
  await getRoute()
  await getTickets()
  window.print()
})

</script>

<template>
  <div class="text-black w-full h-full flex flex-col p-4">
    <div class="flex justify-between">
      <div class="mb-8">
        <h1 class="text-4xl mb-2">Detalles de la ruta</h1>
        <h2><span class="font-bold">Ruta:</span> {{ serviceRoute.route?.name }}</h2>
        <h2><span class="font-bold">Fecha de inicio:</span> {{ serviceRoute.route ?
          dateFormattedWithTime(serviceRoute.route?.started): '' }}</h2>
        <h2><span class="font-bold">Fin:</span> {{ serviceRoute.route?.closed }}</h2>
        <h2><span class="font-bold">Asignado a:</span> {{ serviceRoute.route?.assignedTo?.name }}</h2>
      </div>
      <div>
        <img src="https://gana-loterias.com/wp-content/uploads/2024/05/gana_logo_web.webp" alt="Logo"
          class="w-24 h-24" />
      </div>
    </div>
    <table class="table-fixed  border-collapse border border-black-500 w-full">
      <thead>
        <tr>
          <th>Código de agencia</th>
          <th>Teléfono</th>
          <th>Motivo</th>
          <th>Dirección</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="ticket in serviceRoute.tickets" :key="ticket.id">
          <td>{{ ticket.agent?.code }}</td>
          <td>{{ ticket.phone }}</td>
          <td>
            <div v-html="ticket.content"></div>
          </td>
          <td>{{ ticket.agent?.address }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>