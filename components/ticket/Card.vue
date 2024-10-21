<script setup lang="ts">
import { TicketAssignTo, TicketChangeStatus, TicketDelete, TicketEdit, TicketModalResolve, TicketTransfer } from "#components";
import type { Department, Ticket, TicketCreate, TicketResolve } from "~/types";

const modal = useModal()

const modals = reactive({
  update: false,
  resolve: false,
})

const props = defineProps(
  {
    data: {
      type: Object as PropType<Ticket>,
      required: true,
    },
  }
)

const ticketToEdit = ref<TicketCreate>({
  id: props.data.id,
  customerName: props.data.customerName,
  phone: props.data.phone,
  assignedTo: props.data.assignedTo?.id ?? '',
  department: props.data.department?.id ?? '',
  status: props.data.status?.id ?? '',
  agentCode: props.data.agentCode,
  conversationId: props.data.conversationId,
  senderId: props.data.senderId,
  content: '',
})

const unassigned = async (row: Ticket) => {
  if (!row.id) return
  console.log(row)
  const ticket = await useUpdateTicket(row.id, { route: null })
  return ticket
}

const items = [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      const ticket = {
        customerName: props.data.customerName,
        phone: props.data.phone,
        agentCode: props.data.agentCode,
        conversationId: props.data.conversationId,
        senderId: props.data.senderId,
        content: props.data.content,
        department: props.data.department?.id ?? '',
        assignedTo: props.data.assignedTo?.id ?? '',
        status: props.data.status?.id ?? '',
      }
      modal.open(TicketEdit, {
        form: ticket,
        ticket: props.data.id,
      })
    }
  }, {
    label: 'Cambiar status',
    icon: 'i-heroicons-archive-box-arrow-down-solid',
    click: () => {
      modal.open(TicketChangeStatus, {
        status: props.data.status?.id,
        ticket: props.data.id,
        onSubmit: (state) => {
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
          ticket: props.data.id,
        })
    }
  }, {
    label: 'Asignar a',
    icon: 'i-heroicons-user-group-20-solid',
    click: () => {
      modal.open(TicketAssignTo, {
        ticket: props.data.id,
        assignedTo: props.data.assignedTo?.id ?? '',
      })
    }
  }], [{
    label: 'Transferir',
    icon: 'i-heroicons-arrow-right-20-solid',
    click: () => {
      modal.open(TicketTransfer, {
        ticket: props.data.id,
        department: props.data.department?.id ?? '',
      })
    }
  }, {
    label: 'Quitar de la ruta',
    icon: 'i-heroicons-arrow-uturn-right-16-solid',
    click: async () => {
      await unassigned(props.data)
    }
  }
  ], [
    {
      label: 'Ver',
      icon: 'i-heroicons-eye-20-solid',
      click: () => {
        navigateTo(`/tickets/${props.data.id}`)
      }
    }
  ], [{
    label: 'Borrar',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
      modal.open(TicketDelete, {
        id: props.data.id,
      })
    }
  }]
]
</script>

<template>
  <div>
    <UCard v-if="props.data" class="w-80 lg:w-96 min-h-[400px] flex-col cursor-pointer" :ui="{ divide: '' }">
      <template #header>
        <div class="flex items-center justify-between h-16">
          <div @click="navigateTo(`/tickets/${props.data.id}`)"
            class="flex justify-between items-center overflow-hidden w-full">
            <span class="text-lg md:text-2xl lg:text-2xl font-semibold">{{ props.data?.agentCode }}</span>
            <UBadge class="flex items-center text-center p-2 overflow-hidden max-w-40"
              :style="{ ['background-color']: props.data.status?.color }">
              {{ props.data.status?.name }}
            </UBadge>
          </div>
          <div class="flex">
            <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
              <UButton icon="i-heroicons-ellipsis-vertical-16-solid" size="sm" color="primary" variant="link"
                :trailing="false" />
            </UDropdown>
          </div>
        </div>
      </template>
      <div class="flex flex-col" @click="navigateTo(`/tickets/${props.data.id}`)">
        <h2 class="text-md font-bold">Contenido  del ticket:</h2>
        <div v-if="props.data.content" v-html="props.data.content"
          class="mt-4 outline-none dark:opacity-70" tabindex="0">
        </div>
        <div class="mt-2">
          <p>
            <span class="text-sm font-light">Cliente: </span>
            <span class="text-sm font-semibold">{{ props.data.customerName }}</span>
          </p>
          <p>
            <span class="text-sm font-light">Teléfono: </span>
            <span class="text-sm font-semibold">
              <a class="text-primary" :href="`tel:${props.data.phone}`">
                {{ props.data.phone }}
              </a>
            </span>
          </p>
          <p>
            <span class="text-sm font-light">Departamento: </span>
            <span class="text-sm font-semibold">{{ props.data.department?.name }}</span>
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <UAvatar size="xs" :src="props.data?.createdBy?.avatar" alt="Avatar" class="m-2" />
            <span class="font-light text-gray-200"> {{ props.data?.createdBy?.name }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm text-gray-500">{{ timeSince(props.data?.createdAt) }}</span>
            <h3 class="text-xs font-light">
              <span class="text-primary-600 text-base">#{{ props.data?.id.toUpperCase() }}</span>
            </h3>
          </div>
        </div>
      </template>
    </UCard>
    <UCard v-else class="w-80 h-72">
      <div class="space-y-2 w-full">
        <div class="flex justify-between w-full">
          <USkeleton class="h-4 w-[180px]" />
          <USkeleton class="h-4 w-[80px]" />
        </div>
        <USkeleton class="h-4 w-[200px]" />
        <USkeleton class="h-4 w-[200px]" />
        <USkeleton class="h-4 w-[200px]" />
        <br />
        <br />
        <USkeleton class="h-4 w-[200px]" />
        <USkeleton class="h-4 w-[200px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
    </UCard>
    <!-- modals -->
    <div>
      <TicketDelete :id="props.data.id" @success="() => $emit('update:form', true)" />
    </div>
  </div>
</template>