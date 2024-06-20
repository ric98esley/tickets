<script setup lang="ts">
import type { Ticket } from "~/types";

const props = defineProps(
  {
    data: {
      type: Object as PropType<Ticket>,
      // default: () => ({
      //   id: 'Cargando...',
      //   agentCode: '',
      //   customerName: '',
      //   phone: '',
      //   status: {
      //     id: '',
      //     name: '',
      //     color: ''
      //   },
      //   createdBy: {
      //     id: '',
      //     username: ''
      //   },
      //   assignedTo: {
      //     id: '',
      //     username: ''
      //   },
      //   createdAt: '1999-01-01T00:00:00.000Z'
      // }),
    },
  }
)

</script>

<template>
  <UCard v-if="props.data" class="w-72 h-80" :ui="{ divide: '' }">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex justify-between items-center overflow-hidden">
          <span class="text-lg font-semibold">{{ props.data?.agentCode }}</span>
        </div>
        <UBadge class="flex items-center p-2" :style="{ ['background-color']: '#' + props.data.status?.color }">
          {{ props.data.status?.name }}
        </UBadge>
      </div>
    </template>
    <h3 class="text-lg font-bold">
      <span class="text-primary-600 text-base"># {{ props.data?.id.toUpperCase() }}</span>
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
    <template #footer>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <UAvatar size="xs" :src="props.data.createdBy.avatar" alt="Avatar" class="m-2" />
          <span class="font-light text-gray-200"> {{ data.createdBy.name }}</span>
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
</template>