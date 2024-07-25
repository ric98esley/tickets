<script setup lang="ts">
import type { TicketResolve } from '~/types';

const emit = defineEmits(['submit'])

const modal = useModal()

const handlerSubmit = (data: TicketResolve) => {
  emit('submit', data)
  modal.close()
}

</script>

<template>
  <UModal title="Resolver ticket" prevent-close>
    <UCard>
      <template #header>
        <div class="text-lg font-semibold flex justify-between">
          <h2>Resolver ticket</h2>
          <UButton @click="modal.close()" icon="i-heroicons-x-mark-16-solid" variant="link" />
        </div>
      </template>
      <TicketResolve @submit="handlerSubmit" />
    </UCard>
  </UModal>
</template>