<script setup lang="ts">
import type { FindTickets, Ticket } from '~/types';

const route = useRoute()
const router = useRouter()

const modals = reactive({
  dates: false
})

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
  const userStore = useUserStore();

  if (userStore.user?.id === undefined) return
  const { rows, total } = await useFindTicketsByAssignedTo(userStore.user.id,data)

  tickets.rows = rows
  tickets.total = total
}

watch(filters, async (data) => {
  const query = { ...data }

  router.push({
    path: '/mine/tickets',
    query //always isClosed will be a string ignore the type
  })
  await getTickets(data)
})

onMounted(async () => {
  await getTickets(filters)
})

</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <UButton icon="i-heroicons-funnel-16-solid" label="Filtrar Fechas" @click="modals.dates = true" />
      </template>
      <TicketTable :data="tickets.rows" v-model:filters="filters" :total="tickets.total"
        @refresh="getTickets(filters)" />
    </UCard>
    <UModal v-model="modals.dates">
      <UCard>
        <template #header>
          <div class="text-lg font-semibold flex justify-between">
            <h2>Filtrar por fechas</h2>
            <UButton @click="modals.dates = false" icon="i-heroicons-x-mark-16-solid" variant="link" />
          </div>
        </template>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <h2 class="text-lg font-semibold">Fecha de creación</h2>
            <div class="flex items-center justify-around">
              <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton icon="i-heroicons-calendar-days-20-solid" label="Desde" />
                <template #panel="{ close }">
                  <DatePicker v-model="filters.createdStart" is-required @close="close" />
                </template>
              </UPopover>
              -
              <UPopover>
                <UButton icon="i-heroicons-calendar-days-20-solid" label="Hasta" />
                <template #panel="{ close }">
                  <DatePicker v-model="filters.createdStart" is-required @close="close" />
                </template>
              </UPopover>
              <UButton variant="ghost" icon="i-heroicons-x-mark-16-solid"
                @click="filters.createdStart = filters.createdEnd = undefined" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h2 class="text-lg font-semibold">Fecha de resolución</h2>
            <div class="flex items-center justify-around">
              <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton icon="i-heroicons-calendar-days-20-solid" label="Desde" />
                <template #panel="{ close }">
                  <DatePicker v-model="filters.closedAtStart" is-required @close="close" />
                </template>
              </UPopover>
              -
              <UPopover>
                <UButton icon="i-heroicons-calendar-days-20-solid" label="Hasta" />
                <template #panel="{ close }">
                  <DatePicker v-model="filters.closedAtEnd" is-required @close="close" />
                </template>
              </UPopover>
              <UButton variant="ghost" icon="i-heroicons-x-mark-16-solid"
                @click="filters.createdStart = filters.createdEnd = undefined" />
            </div>
          </div>
        </div>
      </UCard>
    </UModal>
  </UContainer>
</template>