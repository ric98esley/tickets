<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { TicketCreate } from '~/types';

const props = defineProps({
  form: {
    type: Object as PropType<TicketCreate>,
    default: () => ({ agent: '', phone: '', assignedTo: '', status: '', agentCode: '', department: '', conversationId: undefined, senderId: undefined, content: '' })
  }
})

const emit = defineEmits({
  submit: (data: TicketCreate) => true,
  'update:form': (value: TicketCreate) => true
})

const disabledSubmit = ref(false)

const validate = (state: TicketCreate): FormError[] => {
  var regex = /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;

  const errors = []
  if (!state.agent) {
    errors.push({ path: 'agent', message: 'El nombre del cliente es requerido' })
  }
  if (!state.phone) {
    errors.push({ path: 'phone', message: 'El teléfono es requerido' })
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

const form = reactive<TicketCreate>({
  agent: props.form.agent || '',
  phone: props.form.phone || '',
  assignedTo: props.form.assignedTo || '',
  status: props.form.status || '',
  department: props.form.department  || '',
  conversationId: props.form.conversationId || 0,
  senderId: props.form.senderId || 0,
  content: props.form.content || '',
})

const submit = (event: FormSubmitEvent<TicketCreate>) => {
  disabledSubmit.value = true
  emit('submit', event.data)
  disabledSubmit.value = false
}

</script>

<template>
  <UForm :validate="validate" :state="form" class="space-y-4" @submit="submit">
    <UFormGroup label="Teléfono" name="phone">
      <UInput v-model="form.phone" label="Teléfono" />
    </UFormGroup>
    <UFormGroup label="Código de agencia" name="agentCode">
      <AgentsSelect v-model="form.agent" />
    </UFormGroup>
    <UFormGroup label="Status" name="status">
      <StatusSelect v-model="form.status" />
    </UFormGroup>
    <UFormGroup label="Departamento" name="department">
      <DepartmentSelect v-model="form.department" />
    </UFormGroup>
    <UFormGroup label="Asignar a" name="assignedTo">
      <UserSelect v-model="form.assignedTo!" />
    </UFormGroup>
    <div class="columns-2">
      <div>
        <UFormGroup label="ID de conversación" name="conversationId">
          <UInput v-model="form.conversationId" type="number" label="ID de conversación" />
        </UFormGroup>
      </div>
      <div>
        <UFormGroup label="ID del remitente" name="senderId">
          <UInput v-model="form.senderId" type="number" label="ID del remitente" />
        </UFormGroup>
      </div>
    </div>
    <UFormGroup label="Contenido" name="content">
      <RichText v-model="form.content" />
    </UFormGroup>
    <UButton :disable="disabledSubmit" key="save_ticket" type="submit">
      Guardar
    </UButton>
  </UForm>
</template>