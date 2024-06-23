<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps({
  form: {
    type: Object as PropType<StatusCreate>,
    default: () => ({ name: '', color: '' })
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
  color: Joi.string()
    .min(4)
    .required()
    .messages({
      'string.base': 'El color debe ser un texto',
      'string.empty': 'El color no puede estar vacío',
      'string.min': 'El color debe tener al menos {#limit} caracteres',
      'any.required': 'El color es requerido'
    })
})



const form = ref({
  name: props.form.name,
  color: props.form.color
})

const emit = defineEmits({
  submit: (data: StatusCreate) => true
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
    <UFormGroup label="Color" name="color">
      <div
        class="flex border border-gray-700 rounded-md disabled:opacity-50 cursor-pointer disabled:pointer-events-none hover:border-primary-500">
        <UInput v-model="form.color" type="color" name="Color" variant="none" :padded="false"
          inputClass="color-picker" />
        <UInput v-model="form.color" variant="none">
        </UInput>
      </div>
    </UFormGroup>
    <UButton type="submit">
      Guardar
    </UButton>
  </UForm>
</template>

<style>
.color-picker {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 60px;
  height: 32px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.color-picker::-webkit-color-swatch {
  border-radius: 6px;
  border: none;
}

.color-picker::-moz-color-swatch {
  border-radius: 6px;
  border: none;
}
</style>