<script setup lang="ts">
import Joi from 'joi'

import type { FormSubmitEvent } from '#ui/types'
import type { Status, TicketCreate } from '~/types';

const loadings = reactive({
  status: false,
})

const createTicketSchema = Joi.object({
  customerName: Joi.string().required().messages(
    {
      'string.base': 'El nombre debe ser un texto',
      'string.empty': 'El nombre no puede estar vacío',
      'any.required': 'El nombre es requerido'
    }
  ),
  phone: Joi.string().required().messages(
    {
      'string.base': 'El teléfono debe ser un texto',
      'string.empty': 'El teléfono no puede estar vacío',
      'any.required': 'El teléfono es requerido'
    }
  ),
  assignedTo: Joi.string().messages(
    {
      'string.base': 'El asignado a debe ser un texto',
    }
  ),
  status: Joi.string().required(),
  agentCode: Joi.string(),
  conversationId: Joi.string(),
  senderId: Joi.string(),
  content: Joi.string(),
})


const state = reactive<{
  form: TicketCreate
  loading: boolean
  error: any
}>({
  form: {
    customerName: "",
    phone: "",
    assignedTo: "",
    status: "",
    agentCode: "",
    conversationId: undefined,
    senderId: undefined,
    content: "",
  },
  loading: false,
  error: null,
})

const handlerSubmit = async (event: FormSubmitEvent<TicketCreate>) => {
  const toast = useToast()
  if (!event.data.content) {
    return toast.add({
      title: 'Error',
      description: 'El contenido es requerido',
      color: 'red',
    })
  }
  const ticket = await useCreateTicket(event.data)
  if (!ticket) return
  const thread = await useCreateThread({
    ticket: ticket.id,
    content: event.data.content,
  })

  toast.add({
    title: 'Ticket creado',
    description: 'El ticket ha sido creado correctamente',
    color: 'green',
  })
}

</script>

<template>
  <UForm :schema="createTicketSchema" class="space-y-4" :state="state.form" @submit="handlerSubmit">
    <UFormGroup label="Nombre" name="customerName">
      <UInput v-model="state.form.customerName" />
    </UFormGroup>
    <UFormGroup label="Teléfono" name="phone">
      <UInput v-model="state.form.phone" label="Teléfono" />
    </UFormGroup>
    <UFormGroup label="Código de agencia" name="agentCode">
      <UInput v-model="state.form.agentCode" label="Código de agencia" />
    </UFormGroup>
    <UFormGroup label="Status" name="status">
      <StatusSelect v-model="state.form.status"/>
    </UFormGroup>
    <UFormGroup label="Asignado a" name="assignedTo">
      <UInput v-model="state.form.assignedTo" label="Asignado a" />
    </UFormGroup>
    <div class="columns-2">
      <UFormGroup label="ID de conversación" name="conversationId">
        <UInput v-model="state.form.conversationId" type="number" label="ID de conversación" />
      </UFormGroup>
      <UFormGroup label="ID del remitente" name="senderId">
        <UInput v-model="state.form.senderId" type="number" label="ID del remitente" />
      </UFormGroup>
    </div>
    <UFormGroup label="Contenido">
      <RichText v-model="state.form.content" />
    </UFormGroup>
    <UButton type="submit">
      Guardar
    </UButton>
  </UForm>
</template>