<script setup lang="ts">

const ticketsStore = useTicketsStore()

const unsubscribe = ticketsStore.realtimeTicketHandlers()

onMounted(async () => {
  const tickets = await ticketsStore.fetchTickets()
  ticketsStore.addTickets(tickets)
})

onUnmounted(() => {
  unsubscribe
})
</script>

<template>
  <TicketGrid :data="ticketsStore.tickets"/>
</template>