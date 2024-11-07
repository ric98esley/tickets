<script setup lang="ts">
import { TicketAssignTo, TicketChangeStatus, TicketDelete, TicketEdit, TicketModalResolve, TicketTransfer } from "#components";
import type { Department, FindTickets, Ticket, TicketResolve } from "~/types";
import { dateFormattedWithTime } from '~/utils/date-format';

const modal = useModal()

const props = defineProps({
  data: {
    type: Array as PropType<Ticket[]>,
    required: true
  },
  filters: {
    type: Object as PropType<FindTickets>,
    default: {
      page: 1,
      limit: 10,
      id: '',
      agent: '',
      status: '',
      assignedTo: '',
      phone: '',
      content: '',
      isClosed: false,
      zone: ''
    }
  },
  selected: {
    type: Array as PropType<Ticket[]>,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  },
})

const emit = defineEmits(["update:filters", "update:page", "update:form", "refresh", "onSelected"])

const filters = computed({
  get: () => props.filters,
  set: (value) => emit('update:filters', value)
})

const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'agent.code',
    label: 'Código Agencia'
  }, {
    key: 'phone',
    label: 'Teléfono'
  }, {
    key: 'route.name',
    label: 'Ruta'
  }, {
    key: 'assignedTo.name',
    label: 'Asignado a'
  }, {
    key: 'content',
    label: 'Contenido'
  }, {
    key: 'isClosed',
    label: 'Resuelto'
  },
  {
    key: 'status.name',
    label: 'Estatus'
  },
  {
    key: 'actions',
    label: 'Acciones'
  },
  {
    key: 'agent.zone.name',
    label: 'Zona'
  },
  {
    key: 'department.name',
    label: 'Departamento'
  },
  {
    key: 'closedAt',
    label: 'Resuelto el'
  },
  {
    key: 'timeSince',
    label: 'Creado el'
  },
]

const selectedColumns = ref([
  ...columns.slice(1, 9),
])

const selected = ref<Ticket[]>([])

const action = ref<any>(undefined)

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
    await useCreateThread({
      ticket: ticket.id,
      content: `El ticket ha sido resuelto por ${ticket.assignedTo?.name}`,
    })
  }
}

const unassigned = async (row: Ticket) => {
  if (!row.id) return
  console.log(row)
  const ticket = await useUpdateTicket(row.id, { route: null })
  emit('refresh')
  return ticket
}

const applyAction = async () => {
  if (!action.value) return
  if (action.value === 'unassigned') {
    await Promise.all(selected.value.map(async (row) => await unassigned(row)))
    emit('refresh')
    action.value = undefined
    selected.value = []
  }
  if (action.value === 'resolve') {
    modal.open(TicketModalResolve, {
      onSubmit: async (form) => {
        await Promise.all(selected.value.map(async (row) => await resolveTicket(row.id, form)))
        emit('refresh')
        action.value = undefined
        selected.value = []
      }
    })
  }
  if (action.value === 'delete') {
    await Promise.all(selected.value.map(async (row) => await useDeleteTicket(row.id)))
    emit('refresh')
    action.value = undefined
    selected.value = []
  }
  if (action.value === 'assign') {
    modal.open(TicketAssignTo, {
      onSubmit: async (form) => {
        await Promise.all(selected.value.map(async (row) => await useUpdateTicket(row.id, { assignedTo: form.assignedTo })))
        emit('refresh')
        action.value = undefined
        selected.value = []
      }
    })
  }
  if (action.value === 'transfer') {
    modal.open(TicketTransfer, {
      onSubmit: async (form) => {
        await Promise.all(selected.value.map(async (row) => await useUpdateTicket(row.id, { route: form.department })))
        emit('refresh')
        action.value = undefined
        selected.value = []
      }
    })
  }
}

const items = (row: Ticket) => [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      const ticket = {
        phone: row.phone,
        agent: row.agent?.id ?? '',
        conversationId: row.conversationId,
        senderId: row.senderId,
        content: row.content,
        department: row.department?.id ?? '',
        assignedTo: row.assignedTo?.id ?? '',
        status: row.status?.id ?? '',
      }
      modal.open(TicketEdit, {
        form: ticket,
        ticket: row.id,
        onSubmit: (form) => {
          emit('refresh')
        },
      })
    }
  }, {
    label: 'Cambiar status',
    icon: 'i-heroicons-archive-box-arrow-down-solid',
    click: () => {
      modal.open(TicketChangeStatus, {
        status: row.status?.id,
        ticket: row.id,
        onSubmit: (state) => {
          emit('refresh')
          modal.close()
        },
      })
    }
  }, {
    label: 'Resolver',
    icon: 'i-heroicons-document-duplicate-20-solid',
    click: () => {
      modal.open(TicketModalResolve,
        {
          ticket: row.id,
          onSubmit: (form) => emit('refresh'),
        })
    }
  }, {
    label: 'Asignar a',
    icon: 'i-heroicons-user-group-20-solid',
    click: () => {
      modal.open(TicketAssignTo, {
        ticket: row.id,
        assignedTo: row.assignedTo?.id ?? '',
        onSubmit: (form) => emit('refresh'),
      })
    }
  }], [{
    label: 'Transferir',
    icon: 'i-heroicons-arrow-right-20-solid',
    click: () => {
      modal.open(TicketTransfer, {
        ticket: row.id,
        department: row.department?.id ?? '',
        onSubmit: (form: Department) => emit('refresh'),
      })
    }
  }, {
    label: 'Quitar de la ruta',
    icon: 'i-heroicons-arrow-uturn-right-16-solid',
    click: async () => {
      await unassigned(row)
    }
  }
  ], [
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

const actions = [
  { label: 'Quitar de la ruta', value: 'unassigned' },
  { label: 'Resolver', value: 'resolve' },
  { label: 'Borrar', value: 'delete' },
  { label: 'Asignar a', value: 'assign' },
  { label: 'Transferir', value: 'transfer' },
]

watch(selected, (value) => {
  emit('onSelected', value)
})
</script>

<template>
  <UContainer>
    <div
      class="flex flex-col justify-end content-end md:flex-row md:justify-between px-0 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <div class="flex pb-4">
        <USelect v-model="action" class="mr-4 w-full" :options="actions" option-attribute="label" />
        <UButton icon="i-heroicons-check-16-solid" label="Aplicar" @click="applyAction" />
      </div>
      <div class="flex pb-4">
        <USelectMenu class="w-full" v-model="selectedColumns"  :options="columns" multiple placeholder="Columnas"
          label="Selecciona">
          <template #label>
            <span class="truncate">{{ selectedColumns.length }}</span>
            <span>Columnas</span>
          </template>
        </USelectMenu>
        <UButton variant="ghost" icon="i-heroicons-arrow-path-rounded-square-20-solid" label="Refrescar"
          @click="emit('refresh')" />
      </div>
    </div>
    <UTable :rows="props.data" v-model="selected" :columns="selectedColumns">
      <template #id-header>
        <UInput v-model="filters.id" placeholder="ID" class="w-20" />
      </template>
      <template #agent-header>
        <UInput v-model="filters.agent" placeholder="Código de agencia" class="w-20" />
      </template>
      <template #status.name-header>
        <UInput v-model="filters.status" placeholder="Estatus" class="w-20" />
      </template>
      <template #assignedTo.name-header>
        <UInput v-model="filters.assignedTo" placeholder="Asignado a" class="w-20" />
      </template>
      <template #phone-header>
        <UInput v-model="filters.phone" placeholder="Teléfono" class="w-20" />
      </template>
      <template #phone-data="{ row }">
        <a class="text-primary" :href="'tel:' + row.phone">{{ row.phone }}</a>
      </template>
      <template #content-header>
        <UInput v-model="filters.content" placeholder="Contenido" class="w-48" />
      </template>
      <template #content-data="{ row }">
        <div class="overflow-y-auto text-balance max-w-48 max-h-24">
          <div v-html="row.content" />
        </div>
      </template>
      <template #closedAt-data="{ row }">
        {{ row.closedAt ? dateFormattedWithTime(row.closedAt) : 'No resuelto' }}
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
      <template #agent.zone.name-header>
        <UInput v-model="filters.zone" placeholder="Zona" class="w-20" />
      </template>
    </UTable>
    <Pagination :total="props.total" v-model:page="filters.page" v-model:limit="filters.limit" />
  </UContainer>
</template>