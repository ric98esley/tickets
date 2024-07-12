<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { TicketCreate } from '~/types';



const props = defineProps({
  form: {
    type: Object as PropType<TicketCreate>,
    default: () => ({ customerName: '', phone: '', assignedTo: '', status: '', agentCode: '', conversationId: undefined, senderId: undefined, content: '' })
  }
})

const emit = defineEmits({
  submit: (data: TicketCreate) => true,
  'update:form': (value: TicketCreate) => true
})

const disabledSubmit = ref(false)

const validate = (state: TicketCreate): FormError[] => {
  const errors = []
  if (!state.customerName) {
    errors.push({ path: 'customerName', message: 'El nombre del cliente es requerido' })
  }
  if (!state.phone) {
    errors.push({ path: 'phone', message: 'El teléfono es requerido' })
  }
  if (!state.agentCode) {
    errors.push({ path: 'agentCode', message: 'El código de agencia es requerido' })
  }
  if (!state.status) {
    errors.push({ path: 'status', message: 'El status es requerido' })
  }

  return errors
}

const state = reactive<{
  form: TicketCreate
  loading: boolean
  error: any
}>({
  form: props.form,
  loading: false,
  error: null,
})

const submit = (event: FormSubmitEvent<TicketCreate>) => {
  disabledSubmit.value = true
  emit('submit', event.data)
  disabledSubmit.value = false
}

</script>

<template>
  <UForm :validate="validate" :state="state.form" class="space-y-4" @submit="submit">
    <UFormGroup label="Nombre" name="customerName">
      <UInput v-model="state.form.customerName" />
    </UFormGroup>
    <UFormGroup label="Teléfono" name="phone">
      <UInput v-model="state.form.phone" label="Teléfono" type="number" />
    </UFormGroup>
    <UFormGroup label="Código de agencia" name="agentCode">
      <UInput v-model="state.form.agentCode" label="Código de agencia" />
    </UFormGroup>
    <UFormGroup label="Status" name="status">
      <StatusSelect v-model="state.form.status" />
    </UFormGroup>
    <UFormGroup label="Asignar a" name="assignedTo">
      <UserSelect v-model="state.form.assignedTo" />
    </UFormGroup>
    <div class="columns-2">
      <div>
        <UFormGroup label="ID de conversación" name="conversationId">
          <UInput v-model="state.form.conversationId" type="number" label="ID de conversación" />
        </UFormGroup>
      </div>
      <div>
        <UFormGroup label="ID del remitente" name="senderId">
          <UInput v-model="state.form.senderId" type="number" label="ID del remitente" />
        </UFormGroup>
      </div>
    </div>
    <UFormGroup label="Contenido" name="content">
      <RichText v-model="state.form.content" />
    </UFormGroup>
    <UButton :disable="disabledSubmit" key="save_ticket" type="submit">
      Guardar
    </UButton>
  </UForm>
</template>