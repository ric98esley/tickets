<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array as PropType<Ticket[]>,
    default: () => []
  }
})

</script>

<template>
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
    <TicketCard v-for="ticket in props.data" :key="ticket.id" :data="ticket" />
  </div>
</template>