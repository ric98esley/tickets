<script setup lang="ts">

const ticketsStore = useTicketsStore()
const rows = reactive(ticketsStore.tickets)


onMounted(async () => {
  const tickets = await ticketsStore.fetchTickets()
  ticketsStore.addTickets(tickets)
})
</script>

<template>
  <UContainer>
    <UTable :rows="rows" />
  </UContainer>
</template>