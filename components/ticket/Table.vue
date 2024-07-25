<script setup lang="ts">
import { TicketDelete, TicketModal, TicketModalResolve } from "#components";
import type { FindTickets, Ticket, TicketCreate, TicketResolve } from "~/types";

const modal = useModal()

const props = defineProps({
  data: {
    type: Array as PropType<Ticket[]>,
    required: true
  },
  filters: {
    type: Object as PropType<FindTickets>,
    default: () => ({
      limit: Number,
      page: Number,
      agentCode: String,
      assignedTo: String,
      customerName: String,
      status: String,
    })
  },
  total: {
    type: Number,
    default: 0
  },
})

const emit = defineEmits(["update:filters", "update:page", "update:form", "refresh"])

const filters = computed({
  get: () => props.filters,
  set: (value) => emit('update:filters', value)
})

const columns = [{
  key: 'id',
  label: 'ID',
}, {
  key: 'agentCode',
  label: 'Código Agente'
}, {
  key: 'customerName',
  label: 'Nombre Cliente'
}, {
  key: 'phone',
  label: 'Teléfono'
}, {
  key: 'status.name',
  label: 'Estatus'
}, {
  key: 'assignedTo.name',
  label: 'Asignado a'
}, {
  key: 'closedAt',
  label: 'Resuelto el'
}, {
  key: 'timeSince',
  label: 'Creado el'
}, {
  key: 'isClosed',
  label: 'Resuelto'
}, {
  key: 'actions',
  label: 'Acciones'
}]

const selectedColumns = ref([...columns])

const updateTicket = async (id: string, data: TicketCreate) => {
  if (!id) return
  const ticket = await useUpdateTicket(id, data)
  if (data.content && data.content !== "<p></p>" && ticket?.id) {
    const thread = await useCreateThread({
      ticket: ticket.id,
      content: data.content,
    })
  }

  modal.close()
  emit('refresh')
  return ticket
}

const resolveTicket = async (id: string, data: TicketResolve) => {
  if (!data.content) {
    const toast = useToast()
    toast.add({ color: 'red', title: 'El contenido es requerido' })
    return
  }
  if (!id) return
  const ticket = await useUpdateTicket(id, { isClosed: true, closedAt: new Date() })
  if (data.content && data.content !== "<p></p>" && ticket?.id) {
    await useCreateThread({
      ticket: ticket.id,
      content: data.content,
    })
  }

  modal.close()
  emit('refresh')
  return ticket
}

const items = (row: Ticket) => [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      modal.open(TicketModal, {
        data: row,
        onSubmit: (form) => updateTicket(row.id, form),
      })
    }
  }, {
    label: 'Resolver',
    icon: 'i-heroicons-document-duplicate-20-solid',
    click: () => {
      modal.open(TicketModalResolve, {
        onSubmit: (form) => resolveTicket(row.id, form),
      })
    }
  }], [
    {
      label: 'Ver',
      icon: 'i-heroicons-eye-20-solid',
      click: () => {
        navigateTo(`/tickets/${row.id}`)
      }
    }
  ], [{
    label: 'Borrar',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
      modal.open(TicketDelete, {
        id: row.id,
        onSuccess: () => emit('update:form', true)
      })
    }
  }]
]

const resolve = [
  { label: 'Todos', value: undefined },
  { label: 'Resuelto', value: true },
  { label: 'Pendiente', value: false },
]
</script>

<template>
  <UContainer>
    <div class="flex justify-end px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columnas" label="Selecciona">
        <template #label>
          <span class="truncate">{{ selectedColumns.length }}</span>
          <span>Columnas</span>
        </template>
      </USelectMenu>
      <UButton variant="ghost" icon="i-heroicons-arrow-path-rounded-square-20-solid" label="Refrescar" @click="emit('refresh')" />
    </div>
    <UTable :rows="props.data" :columns="selectedColumns">
      <template #id-header>
        <UInput v-model="filters.id" placeholder="ID" class="w-36" />
      </template>
      <template #agentCode-header>
        <UInput v-model="filters.agentCode" placeholder="Código de agente" class="w-36" />
      </template>
      <template #customerName-header>
        <UInput v-model="filters.customerName" placeholder="Nombre del cliente" class="w-36" />
      </template>
      <template #status.name-header>
        <UInput v-model="filters.status" placeholder="Estatus" class="w-36" />
      </template>
      <template #assignedTo.name-header>
        <UInput v-model="filters.assignedTo" placeholder="Asignado a" class="w-36" />
      </template>
      <template #phone-header>
        <UInput v-model="filters.phone" placeholder="Teléfono" class="w-36" />
      </template>
      <template #phone-data="{ row }">
        <a class="text-primary" :href="'tel:' + row.phone">{{ row.phone }}</a>
      </template>
      <template #closedAt-data="{ row }">
        {{ row.closedAt ? dateFormattedWithTime(row.closedAt): 'No resuelto' }}
      </template>
      <template #isClosed-header>
        <USelectMenu v-model="filters.isClosed" :options="resolve" placeholder="Resuelto" valueAttribute="value" />
      </template>
      <template #isClosed-data="{ row }">
        <UBadge :color="row.isClosed ? 'green' : 'red'">{{ row.isClosed ? 'Resuelto' : 'Pendiente' }}</UBadge>
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <Pagination :total="props.total" v-model:page="filters.page" v-model:limit="filters.limit" />
  </UContainer>
</template>