<script setup lang="ts">
/* __placeholder__ */
import type { Ticket } from '~/types';

const route = useRoute()
const router = useRouter()

const items = [{
  slot: 'ticket',
  label: 'Ticket',
}, {
  slot: 'historial',
  label: 'Historial',
}]

const ticket = ref<Ticket | null>(null)

const descriptionItems = ref<DescriptionItem[]>([
])

const getTicket = async () => {
  const data = await useFindOneTicket(String(route.params.id))
  if (data) {
    const items = <DescriptionItem[]>[
      {
        icon: 'i-heroicons-information-circle-20-solid',
        title: 'ID',
        data: data.id
      },
      {
        icon: 'i-heroicons-map-pin-solid',
        title: 'Lugar',
        data: data.agentCode
      },
      {
        icon: 'i-heroicons-rectangle-stack-16-solid',
        title: 'Estado',
        data: data.status?.name ?? 'Sin estado'
      },
      {
        icon: 'i-heroicons-user-circle-16-solid',
        title: 'Nombre del cliente',
        data: data.customerName
      },
      {
        icon: 'i-heroicons-phone-arrow-down-left-solid',
        title: 'Teléfono',
        data: data.phone
      },
      {
        icon: 'i-heroicons-user-solid',
        title: 'Creado por',
        data: data.createdBy?.name ?? 'Sin creador'
      },
      {
        icon: 'i-heroicons-calendar-days-16-solid',
        title: 'Fecha',
        data: new Date(data.createdAt).toLocaleDateString()
      }
    ]

    descriptionItems.value = items
  }
  ticket.value = data
}

const selected = computed({
  get() {
    const index = items.findIndex((item) => item.label === route.query.tab)
    if (index === -1) {
      return 0
    }

    return index
  },
  set(value) {
    // Hash is specified here to prevent the page from scrolling to the top
    router.replace({ query: { tab: items[value].label } })
  }
})

watch(() => route.params.id, () => {
  getTicket()
})
onMounted(() => {
  getTicket()
})
</script>

<template>
  <div>
    <UTabs v-model="selected" :items="items">
      <template #ticket="{ item }">
        <div v-if="ticket">
          <div class="flex">
          </div>
          <UCard>
            <template #header>
              <div class="flex items justify-between">
                <p>{{ ticket.agentCode }}</p>
                <div class="flex flex-col sm:flex-row justify-end gap-2">
                  <UButton icon="i-heroicons-chat-bubble-left-right-solid" :ui="{ rounded: 'rounded-full' }"
                    @click="navigateTo(`https://wa.me/${ticket.phone}`, { external: true, open: { target: '_blank' } })"
                    label="WhatsApp"
                  />
                  <UButton icon="i-heroicons-chat-bubble-oval-left-solid" :ui="{ rounded: 'rounded-full' }"
                    @click="navigateTo(`https://crm.gana-loterias.com/app/accounts/1/conversations/${ticket.conversationId}`, { external: true, open: { target: '_blank' } })"
                    label="Chat" />
                </div>
              </div>
            </template>
            <template #default>
              <Description :data="descriptionItems" />
            </template>
          </UCard>
        </div>
      </template>
    </UTabs>
  </div>
</template>