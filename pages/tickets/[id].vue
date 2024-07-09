<script setup lang="ts">
import type { Thread, Ticket } from '~/types';

const route = useRoute()
const router = useRouter()

const container: Ref<HTMLElement | null> = ref(null);

const items = [{
  slot: 'ticket',
  label: 'Ticket',
}, {
  slot: 'historial',
  label: 'Historial',
}]

const ticket = ref<Ticket | null>(null)

const descriptionItems = ref<DescriptionItem[]>([])

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

const threads = ref<Thread[]>([])

const getThread = async () => {
  const data = await useListThread(String(route.params.id))
  threads.value = data;
}

const state = reactive({
  response: ''
})

async function onSubmit() {
  if (state.response) {
    await useCreateThread({ ticket: String(route.params.id), content: state.response })
    state.response = ''
    getThread()
  }
}

watch(() => threads.value, async () => {
  await nextTick(); // Asegúrate de que la actualización del DOM se complete
  if (container.value) {
    container.value.scrollTop = container.value.scrollHeight;
  }
})

watch(() => route.params.id, () => {
  getTicket()
})

onMounted(() => {
  getThread()
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
                    label="WhatsApp" />
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
      <template #historial>
        <UCard>
          <template #header>
            <h2 class="text-lg font-light">Historial</h2>
          </template>
          <div ref="container" class="flex flex-col gap-2 h-[50svh] overflow-y-scroll">
            <HistoryItem v-for="thread in threads" :message="thread" />
          </div>
          <template #footer>
            <UForm :state="state" class="space-y-4" @submit="onSubmit">
              <UFormGroup>
                <div class="flex justify-end gap-2 content-center">
                  <UTextarea v-model="state.response" class="w-full" placeholder="Agrega un comentario al ticket" />
                  <UButton square icon="i-heroicons-paper-airplane-16-solid" type="submit" />
                </div>
              </UFormGroup>
            </UForm>
          </template>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>
