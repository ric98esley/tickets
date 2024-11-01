<script setup lang="ts">
import type { FindTickets, Route, RouteCreate, Ticket } from '~/types';
const route = useRoute()
const router = useRouter()

const items = [{
  slot: 'ruta',
  label: 'Ruta',
}, {
  slot: 'tickets',
  label: 'Tickets',
}]

const modals = reactive({
  dates: false,
  edit: false
})

const tickets = reactive<{ total: number, rows: Ticket[] }>({
  total: 0,
  rows: []
})

const filters = reactive<FindTickets>({
  limit: route.query.limit ? Number(route.query.limit) : 10,
  page: route.query.page ? Number(route.query.page) : 1,
  agent: route.query.agent as string || undefined,
  assignedTo: route.query.assignedTo as string || undefined,
  status: route.query.status as string || undefined,
  closedAtStart: route.query.closedAtStart as string || undefined,
  closedAtEnd: route.query.closedAtEnd as string || undefined,
  isClosed: (route.query.isClosed !== undefined) ? route.query.isClosed?.toString() : undefined,
})

const getTickets = async (data: FindTickets) => {
  const routeId = route.params.id.toString()

  if (!routeId) return
  const { rows, total } = await useFindTicketsByRoute(routeId, data)

  tickets.rows = rows
  tickets.total = total
}


watch(filters, async (data) => {
  const query = { ...data }

  router.push({
    path: '/rutas/' + route.params.id,
    query //always isClosed will be a string ignore the type
  })
  await getTickets(data)
})

const routeData = ref<Route | undefined>(undefined)

const routeEdit = ref<RouteCreate | undefined>(undefined)

const getRoute = async () => {
  const res = await useFindOneRoute(String(route.params.id))

  if (!res) return

  routeEdit.value = {
    zone: res.zone?.id ?? '',
    assignedTo: res.assignedTo?.id ?? '',
    started: res.started.toString().split(' ')[0] ?? '',
    tickets: res.tickets
  }

  routeData.value = res
}

const handlerSubmit = async (data: RouteCreate) => {
  if(routeData.value === undefined) return
  const response = await useUpdateRoute(routeData.value.id ,data)
  if (!response) return
  for (const ticket of data.tickets) {
    await useUpdateTicket(ticket.id, { route: response.id })
  }

  await useUpdateTicketWhere(`route="${route.params.id}"`,{
    route: response.id,
    assignedTo: data.assignedTo
  })

  await getTickets(filters)
}

onMounted(() => {
  getRoute()
  getTickets(filters)
})
</script>

<template>
  <div>
    <div v-if="routeData">
      <UCard>
        <template #header>
          Ruta: <span class="text-primary">{{ routeData.name.toLocaleUpperCase() }}</span>
          <div class="flex justify-between mt-4">
            <div>
              <p>Inicio: {{ dateFormatted(routeData.started) }}</p>
              <p>Fin: {{ routeData.closed ? dateFormatted(routeData.closed) : 'No finalizado' }}</p>
              <p>Creado: {{ dateFormattedWithTime(routeData.created) }}</p>
            </div>
            <div class="flex flex-col gap-4 justify-end">
              <NuxtLink :to="'/usuarios/' + routeData.assignedTo?.id">
                <span class="text-primary font-bold">Asignado a: {{ routeData.assignedTo?.name }}</span>
              </NuxtLink>
              <div>
                <UButton icon="i-heroicons-pencil-square-solid" label="Editar" @click="modals.edit = true" />
              </div>
            </div>
          </div>
        </template>
        <div class="flex ml-4 md:ml-6 lg:ml-8 gap-4">
          <UButton icon="i-heroicons-funnel-16-solid" label="Filtrar Fechas" @click="modals.dates = true" />
        </div>
        <TicketTable :data="tickets.rows" v-model:filters="filters" :total="tickets.total"
          @refresh="getTickets(filters)" />
      </UCard>
    </div>
    <USkeleton v-else class="h-80 w-full" />
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
    <UModal v-model="modals.edit" prevent-close>
      <UCard>
        <template #header>
          <div class="text-lg font-semibold flex justify-between">
            <h2>Editar Ruta</h2>
            <UButton @click="modals.edit = false" icon="i-heroicons-x-mark-16-solid" variant="link" />
          </div>
        </template>
        <RoutesSave :form="routeEdit" @submit="handlerSubmit" />
      </UCard>
    </UModal>
  </div>
</template>