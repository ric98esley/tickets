<script setup lang="ts">
const ticketsStore = useTicketsStore()

const tickets = ticketsStore.tickets

onMounted(() => {
  ticketsStore.fetchTickets()
})

</script>

<template>
  <UContainer>
    <UTable :rows="tickets" />
  </UContainer>
</template>