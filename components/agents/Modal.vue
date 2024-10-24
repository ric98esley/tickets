<script lang="ts" setup>
import type { AgentCreate } from '~/types/agents';

const modal = useModal()

const props = defineProps({
  form: {
    type: Object as PropType<AgentCreate>,
    default: () => ({
      name: '',
      code: '',
      phone: '',
      address: '',
      inChargeOf: '',
      group: '',
      zone: '',
      facade: '',
    }),
  }
});

const emit = defineEmits(['submit']);

const form = reactive({
  name: props.form.name,
  code: props.form.code,
  phone: props.form.phone,
  address: props.form.address,
  inChargeOf: props.form.inChargeOf,
  group: props.form.group,
  zone: props.form.zone,
  facade: []
})

const handleFormSubmit = (data: AgentCreate) => {
  emit('submit', data)
  modal.close()
}

</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <div class="text-lg font-semibold flex justify-between">
          <h2>Agencias</h2>
          <UButton @click="modal.close()" icon="i-heroicons-x-mark-16-solid" variant="link" />
        </div>
      </template>
      <AgentsForm :form="form" @submit="handleFormSubmit" />
    </UCard>
  </UModal>
</template>