<script setup lang="ts">

const ticketsStore = useTicketsStore()

const unsubscribe = ticketsStore.realtimeTicketHandlers()

onMounted(async () => {
  const tickets = await ticketsStore.fetchTickets({
    isClosed: false,
  })
  ticketsStore.addTickets(tickets.rows)
})

onUnmounted(() => {
  unsubscribe
})
</script>

<template>
  <TicketGrid :data="ticketsStore.tickets"/>
</template>