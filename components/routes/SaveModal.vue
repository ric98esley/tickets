<script lang="ts" setup>
import type { RouteCreate } from '~/types';

const modal = useModal()
const props = defineProps({
  form: {
    type: Object as PropType<RouteCreate>,
    default: () => ({
      name: '',
      description: '',
      assignedTo: '',
      started: '',
      closed: '',
    }),
  },
})
const emit = defineEmits(['submit'])

const handlerSubmit = (data: RouteCreate) => {
  emit('submit', data)
}

</script>

<template>
  <UModal prevent-close>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h1 class="text-2xl font-bold">Ruta</h1>
          <div class="flex space-x-2">
            <UButton @click="modal.close()" icon="i-heroicons-x-mark-16-solid" variant="link" />
          </div>
        </div>
      </template>
      <RoutesSave :form="props.form" @submit="handlerSubmit" />
    </UCard>
  </UModal>
</template>