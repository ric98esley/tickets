<script setup lang="ts">
import type { TicketCreate } from '~/types';


onMounted(() => {
  requestPermission()
})

function requestPermission() {
  if (!window.Notification) return

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker-07112024.js');
    if (window.Notification.permission === 'granted') {
      setToken()
    } else {
      window.Notification.requestPermission((value) => {
        if (value === 'granted') {
          setToken()
        }
      })
    }

  }
}

function subscribe() {
  navigator.serviceWorker.ready
    .then(function (registration) {
      const vapidPublicKey = 'BLd9UYmyM6AXwxbHpgtNHom9CujHJ2PGLb1A6Pjbj3j2PPTX3UjuBd9uNldio9nrP4QY2ywrbCYjc7077G9MXJc';

      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
    })
    .then(async function (subscription) {
      await useSaveSubscription(JSON.stringify(subscription))
    })
    .catch(err => console.error(err));
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}


async function setToken() {
  navigator.serviceWorker.ready
    .then(function (registration) {
      return registration.pushManager.getSubscription();
    })
    .then(async function (subscription) {
      if (!subscription) {
        subscribe();
      } else {
        const sub = await useFindMySubscription({
          endpoint: subscription.endpoint
        })
        if (!sub) await useSaveSubscription(JSON.stringify(subscription))
      }
    });

}


const createNewTicketModal = ref(false)

const handlerSubmit = async (data: TicketCreate) => {
  const toast = useToast()
  if (!data.content || data.content === "<p></p>") {
    toast.add({
      title: 'Error',
      description: 'El contenido es requerido',
      color: 'red',
    })
    return
  }
  const ticket = await useCreateTicket(data)
  if (!ticket) return;

  await useCreateThread({
    ticket: ticket.id,
    content: data.content,
  })

  await useCreateThread({
    ticket: ticket.id,
    content: `
        <p>Estado: ${ticket.status?.name}</p>
        <p>Asignado a: ${ticket.assignedTo?.name || 'Sin asignar'}</p>
        <p>Departamento: ${ticket.department?.name}</p>
      `,
  })

  toast.add({
    title: 'Ticket creado',
    description: 'El ticket ha sido creado correctamente',
    color: 'green',
  })
  createNewTicketModal.value = false
}

onMounted(() => {
  requestPermission()
})
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <UContainer as="main" class="overflow-y-auto p-4 w-screen">
      <slot />
    </UContainer>
    <!-- Bottom-Right Corner -->
    <div class="fixed bottom-4 right-4">
      <UButton @click="createNewTicketModal = !createNewTicketModal" size="xl" square icon="i-heroicons-plus-solid"
        class="font-bold shadow-lg" />

      <UModal v-model="createNewTicketModal" title="Crear Ticket" prevent-close>
        <UCard class="w-full">
          <template #header>
            <div class="flex justify-between">
              <h2>Crear ticket</h2>
              <UButton @click="createNewTicketModal = false" icon="i-heroicons-x-mark-16-solid" variant="link" />
            </div>
          </template>
          <TicketForm @submit="handlerSubmit" />
        </UCard>
      </UModal>
    </div>
  </div>
</template>