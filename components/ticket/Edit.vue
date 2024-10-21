<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { TicketCreate } from '~/types';

const user = useUserStore().user

const modal = useModal()

const emit = defineEmits(['submit'])

const props = defineProps({
  form: {
    type: Object as PropType<TicketCreate>,
    default: () => ({ customerName: '', phone: '', assignedTo: '', status: '', agentCode: '', department: '', conversationId: undefined, senderId: undefined, content: '' })
  },
  ticket: {
    type: String
  }
})

const validate = (state: TicketCreate): FormError[] => {
  var regex = /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;

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

  if (!state.department) {
    errors.push({ path: 'department', message: 'El departamento es requerido' })
  }

  if (!state.phone.match(regex)) {
    errors.push({ path: 'phone', message: 'El teléfono no es válido' })
  }

  return errors
}

const state = reactive({
  customerName: props.form.customerName,
  phone: props.form.phone,
  agentCode: props.form.agentCode,
  conversationId: props.form.conversationId,
  senderId: props.form.senderId,
  content: props.form.content,
})

const handleEdit = async (ticket: string) => {
  const data = await useUpdateTicket(ticket, state)
  const thread = await useCreateThread({
    ticket, content: `
    <p>El ticket ha sido editado por ${user?.username}</p>
    <p>Contenido: ${data?.content}</p>
    <p>Nombre: ${props.form.customerName} => ${data?.customerName}</p>
    <p>Teléfono: ${props.form.phone} => ${data?.phone}</p>
    <p>Código de agencia: ${props.form.agentCode} => ${data?.agentCode}</p>
    <p>ID de conversación: ${props.form.conversationId} => ${data?.conversationId}</p>
    <p>ID del remitente: ${props.form.senderId} => ${data?.senderId}</p>
    ` })
}

const handlerSubmit = async (event: FormSubmitEvent<TicketCreate>) => {
  if (props.ticket) {
    await handleEdit(props.ticket)
  }
  emit('submit', state)
  modal.close()
}
</script>

<template>
  <UModal prevent-close>
    <UCard>
      <template #header>
        <div class="text-lg font-semibold flex justify-between">
          <h2>Editar ticket</h2>
          <UButton @click="modal.close()" icon="i-heroicons-x-mark-16-solid" variant="link" />
        </div>
      </template>
      <UForm :state="state" :validate="validate" class="space-y-4" @submit="handlerSubmit">
        <UFormGroup label="Nombre" name="customerName">
          <UInput v-model="state.customerName" />
        </UFormGroup>
        <UFormGroup label="Teléfono" name="phone">
          <UInput v-model="state.phone" label="Teléfono" />
        </UFormGroup>
        <UFormGroup label="Código de agencia" name="agentCode">
          <UInput v-model="state.agentCode" label="Código de agencia" />
        </UFormGroup>
        <div class="columns-2">
          <div>
            <UFormGroup label="ID de conversación" name="conversationId">
              <UInput v-model="state.conversationId" type="number" label="ID de conversación" />
            </UFormGroup>
          </div>
          <div>
            <UFormGroup label="ID del remitente" name="senderId">
              <UInput v-model="state.senderId" type="number" label="ID del remitente" />
            </UFormGroup>
          </div>
        </div>
        <UFormGroup label="Contenido" name="content">
          <RichText v-model="state.content" />
        </UFormGroup>
        <UButton key="edit_ticket" type="submit" @click="handlerSubmit">
          Guardar
        </UButton>
      </UForm>
    </UCard>
  </UModal>
</template>