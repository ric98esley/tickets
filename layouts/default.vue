<script setup lang="ts">
const createNewTicketModal = ref(false)
</script>

<template>
  <div class="flex flex-col">
    <Header />
    <UContainer as="main" class="overflow-y-auto p-4 w-screen">
      <slot />
    </UContainer>
    <!-- Bottom-Right Corner -->
    <div class="fixed bottom-4 right-4">
      <UButton
        @click="createNewTicketModal = !createNewTicketModal"
        size="xl"
        square
        icon="i-heroicons-plus-solid"
        class="font-bold shadow-lg" />
      <UModal v-model="createNewTicketModal" title="Crear Ticket">
        <UCard class="w-full">
          <template #header>
            <h2>Crear ticket</h2>
          </template>
          <TicketSave />
        </UCard>
      </UModal>
    </div>
  </div>
</template>