<script lang="ts" setup>
import type { RouteCreate } from '~/types';


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
  <UModal>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h1 class="text-2xl font-bold">Ruta</h1>
        </div>
      </template>
      <RoutesSave :form="props.form" @submit="handlerSubmit" />
    </UCard>
  </UModal>
</template>