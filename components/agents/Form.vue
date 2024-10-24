<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { AgentCreate } from '~/types/agents';

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

const validate = (state: AgentCreate): FormError[] => {
  const errors = []
  if (!state.name) {
    errors.push({ path: 'name', message: 'El nombre es requerido' })
  }
  if (!state.code) {
    errors.push({ path: 'code', message: 'El código es requerido' })
  }
  if (!state.phone) {
    errors.push({ path: 'phone', message: 'El teléfono es requerido' })
  }
  if (!state.address) {
    errors.push({ path: 'address', message: 'La dirección es requerida' })
  }
  if (!state.inChargeOf) {
    errors.push({ path: 'inChargeOf', message: 'El encargado es requerido' })
  }
  if (!state.group) {
    errors.push({ path: 'group', message: 'El grupo es requerido' })
  }
  if (!state.zone) {
    errors.push({ path: 'zone', message: 'La zona es requerida' })
  }
  if (!state.facade) {
    errors.push({ path: 'facade', message: 'La fachada es requerida' })
  }
  return errors
}


const form = reactive<AgentCreate>({
  name: props.form.name,
  code: props.form.code,
  phone: props.form.phone,
  address: props.form.address,
  inChargeOf: props.form.inChargeOf,
  group: props.form.group,
  zone: props.form.zone,
  facade: props.form.facade,
})

const handlerSubmit = (event: FormSubmitEvent<AgentCreate>) => {
  if (validate(form).length) return;
  emit('submit', event.data)
}

</script>
<template>
  <UForm :state="form" class="space-y-4" :validate="validate" @submit="handlerSubmit">
    <UFormGroup label="Nombre" name="name">
      <UInput v-model="form.name" />
    </UFormGroup>
    <UFormGroup label="Código" name="code">
      <UInput v-model="form.code" />
    </UFormGroup>
    <UFormGroup label="Teléfono" name="phone">
      <UInput v-model="form.phone" />
    </UFormGroup>
    <UFormGroup label="Nombre del encargado" name="inChargeOf">
      <UInput v-model="form.inChargeOf" />
    </UFormGroup>
    <UFormGroup label="Grupo" name="group">
      <GroupSelect v-model="form.group" />
    </UFormGroup>
    <UFormGroup label="Zona" name="zone">
      <ZoneSelect v-model="form.zone" />
    </UFormGroup>
    <UFormGroup label="Dirección" name="address">
      <UInput v-model="form.address" />
    </UFormGroup>
    <UButton type="submit">Guardar</UButton>
  </UForm>
</template>