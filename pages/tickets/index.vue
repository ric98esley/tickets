<script setup lang="ts">
import type { FindTickets, Ticket } from '~/types';

const route = useRoute()
const router = useRouter()

const tickets = reactive<{ total: number, rows: Ticket[] }>({
  total: 0,
  rows: []
})

const filters = reactive<FindTickets>({
  limit: route.query.limit ? Number(route.query.limit) : 10,
  page: route.query.page ? Number(route.query.page) : 1,
  agentCode: route.query.agentCode as string || undefined,
  assignedTo: route.query.assignedTo as string || undefined,
  customerName: route.query.customerName as string || undefined,
  status: route.query.status as string || undefined,
  closedAtStart: route.query.closedAtStart as string || undefined,
  closedAtEnd: route.query.closedAtEnd as string || undefined,
  isClosed: (route.query.isClosed !== undefined) ? route.query.isClosed?.toString() : undefined,
})

const getTickets = async (data: FindTickets) => {
  const { rows, total } = await useFindTickets(data)

  tickets.rows = rows
  tickets.total = total
}


watch(filters, async (data) => {
  const query = { ...data }

  router.push({
    path: '/tickets',
    query //always isClosed will be a string ignore the type
  })
  await getTickets(data)
})

onMounted(async () => {
  await getTickets(filters)
})

</script>

<template>
  <TicketTable :data="tickets.rows" v-model:filters="filters" :total="tickets.total" @refresh="getTickets(filters)" />
</template>