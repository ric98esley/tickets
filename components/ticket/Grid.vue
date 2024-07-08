<script setup lang="ts">
import type { Ticket } from "~/types";

const props = defineProps({
  data: {
    type: Array as PropType<Ticket[]>,
    default: () => [
      {
        id: '1',
        agentCode: 'AG-001',
        status: {
          name: 'Abierto',
          color: 'FFA500',
        },
        customerName: 'John Doe',
        phone: '1234567890',
        createdBy: {
          avatar: 'https://randomuser.me/api/portraits',
          name: 'Jane Doe',
        },
        createdAt: new Date(),
      },
    ]
  }
})

</script>

<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
    <TicketCard v-for="ticket in props.data" :key="ticket.id" :data="ticket" />
  </div>
</template>