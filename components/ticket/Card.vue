<script setup lang="ts">
import { TicketDelete } from "#components";
import type { Ticket } from "~/types";

const modal = useModal()

const props = defineProps(
  {
    data: {
      type: Object as PropType<Ticket>,
      required: true,
    },
  }
)

const items = [[{
  label: 'Editar',
  icon: 'i-heroicons-pencil-square-20-solid',
  click: () => {
    console.log('Edit')
  }
}, {
  label: 'asignar',
  icon: 'i-heroicons-document-duplicate-20-solid'
}], [{
  label: 'Delete',
  icon: 'i-heroicons-trash-20-solid',
  click: () => {
    modal.open(TicketDelete, {
      id: props.data.id
    })
  }
}]
]



</script>

<template>
  <div>
    <UCard v-if="props.data" class="w-72 h-80 lg:w-96 lg:h-[400px] flex-col cursor-pointer" :ui="{ divide: '' }">
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
      <div class="h-28 md:h-28 flex flex-col" @click="navigateTo(`/tickets/${props.data.id}`)">

        <h3 class="text-lg font-bold">
          Soporte: <span class="text-primary-600 text-base"># {{ props.data?.id.toUpperCase() }}</span>
        </h3>
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
        </div>
        <div class="mt-4">

        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <UAvatar size="xs" :src="props.data?.createdBy?.avatar" alt="Avatar" class="m-2" />
            <span class="font-light text-gray-200"> {{ props.data?.createdBy?.name }}</span>
          </div>
          <span class="text-sm text-gray-500">{{ timeSince(props.data?.createdAt) }}</span>
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