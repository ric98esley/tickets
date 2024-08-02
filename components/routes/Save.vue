<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'
import type { RouteCreate } from '~/types';

const props = defineProps({
  form: {
    type: Object as PropType<RouteCreate>,
    default: () => ({ name: '', assignedTo: '', started: '' })
  }
})

const schema = Joi.object({
  name: Joi.string().required().min(3).max(30)
    .messages({
      'string.base': 'El nombre debe ser un texto',
      'string.empty': 'El nombre no puede estar vacío',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres',
      'string.max': 'El nombre no puede tener más de {#limit} caracteres',
      'any.required': 'El nombre es requerido'
    }),
  assignedTo: Joi.string().required()
    .messages({
      'string.base': 'El asignado debe ser un texto',
      'string.empty': 'El asignado no puede estar vacío',
      'any.required': 'El asignado es requerido'
    }),
  started: Joi.date().required()
    .messages({
      'date.base': 'La fecha de inicio debe ser una fecha',
      'any.required': 'La fecha de inicio es requerida'
    }),
  tickets: Joi.array().items(Joi.object()).required()
})

const form = ref<RouteCreate>({
  name: props.form.name,
  assignedTo: props.form.assignedTo,
  started: props.form.started,
  tickets: []
})

const emit = defineEmits({
  submit: (data: RouteCreate) => true
})

const submit = (event: FormSubmitEvent<any>) => {
  emit('submit', event.data)
}
</script>

<template>
  <UForm :state="form" class="space-y-4" :schema="schema" @submit="submit">
    <UFormGroup label="Nombre" name="name">
      <UInput v-model="form.name" label="Nombre" />
    </UFormGroup>
    <UFormGroup label="Asignar a" name="assignedTo">
      <UserSelect v-model="form.assignedTo" />
    </UFormGroup>
    <UFormGroup label="Fecha inicio" name="started">
      <UInput type="date" v-model="form.started" />
    </UFormGroup>
    <UFormGroup label="Tickets" name="tickets">
      <TicketSelect v-model="form.tickets" :filter-by="(value) => value.route == undefined"/>
    </UFormGroup>
    <UButton type="submit">
      Guardar
    </UButton>
  </UForm>
</template>