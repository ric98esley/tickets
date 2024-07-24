<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { TicketResolve } from '~/types/tickets';

const emit = defineEmits({
  submit: (data: TicketResolve) => true,
  'update:form': (value: TicketResolve) => true
})

const disabledSubmit = ref(false)


const validate = (state: TicketResolve): FormError[] => {
  const errors = []
  if (!state.content) {
    errors.push({ path: 'content', message: 'El contenido es requerido' })
  }

  if (state.content.length < 10) {
    errors.push({ path: 'content', message: 'El contenido debe tener al menos 10 caracteres' })
  }

  return errors
}

const submit = async (event: FormSubmitEvent<TicketResolve>) => {
  disabledSubmit.value = true
  emit('submit', event.data)
  await (() => new Promise(resolve => setTimeout(resolve, 1000)))()
  disabledSubmit.value = false
}

const state = reactive<TicketResolve>({
  content: '',
})
</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="submit" >
    <UFormGroup label="Contenido" name="content">
      <RichText v-model="state.content" />
    </UFormGroup>
    <UButton :disable="disabledSubmit" key="save_ticket" type="submit">
      Guardar
    </UButton>
  </UForm>
</template>