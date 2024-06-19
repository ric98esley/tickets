<script setup lang="ts">

const ticketsStore = useTicketsStore()

onMounted(async () => {
  const tickets = await ticketsStore.fetchTickets()
  ticketsStore.addTickets(tickets)
})
</script>

<template>
  <TicketsTable :data="ticketsStore.tickets" />
</template>