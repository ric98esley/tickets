<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'
import type { Route, RouteCreate } from '~/types';

const props = defineProps({
  form: {
    type: Object as PropType<RouteCreate>,
    default: () => ({ name: '', assignedTo: '', started: '', zone: ''})
  }
})

// const schema = Joi.object({
//   zone: Joi.string().required().messages({
//     'string.base': 'La zona debe ser un texto',
//     'string.empty': 'La zona no puede estar vacía',
//     'any.required': 'La zona es requerida'
//   }),
//   assignedTo: Joi.string().required()
//     .messages({
//       'string.base': 'El asignado debe ser un texto',
//       'string.empty': 'El asignado no puede estar vacío',
//       'any.required': 'El asignado es requerido'
//     }),
//   started: Joi.date().required()
//     .messages({
//       'date.base': 'La fecha de inicio debe ser una fecha',
//       'any.required': 'La fecha de inicio es requerida'
//     }),
// })

const form = ref<RouteCreate>({
  zone: props.form.zone,
  assignedTo: props.form.assignedTo,
  started: props.form.started,
  tickets: []
})

const emit = defineEmits({
  submit: (data: RouteCreate) => true
})

const onSubmit = (event: FormSubmitEvent<RouteCreate>) => {
  console.log('submit', event.data)
  emit('submit', event.data)
}
</script>

<template>
  <UForm :state="form" class="space-y-4"  @submit="onSubmit">
    <UFormGroup label="Asignar a" name="assignedTo">
      <UserSelect v-model="form.assignedTo" />
    </UFormGroup>
    <UFormGroup label="Zona" name="zone">
      <ZoneSelect v-model="form.zone" />
    </UFormGroup>
    <UFormGroup label="Fecha inicio" name="started">
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton icon="i-heroicons-calendar-days-20-solid" color="gray" :label="dateFormatted(form?.started)" variant="ghost" />
        <template #panel="{ close }">
          <DatePicker v-model="form.started" is-required @close="close" />
        </template>
      </UPopover>
    </UFormGroup>
    <UButton type="submit">
      Guardar
    </UButton>
  </UForm>
</template>